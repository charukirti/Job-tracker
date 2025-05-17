"use server";

import prisma from "@/lib/prisma";
import { getOrCreateUser } from "./user";
import { Status, InterviewStage } from "@prisma/client";

const dbUser = await getOrCreateUser();

//  Get overall application statistics for current user

export async function getApplicationStats() {
  const totalApplications = await prisma.application.count({
    where: { userId: dbUser.id },
  });

  const activeApplications = await prisma.application.count({
    where: {
      userId: dbUser.id,
      status: { notIn: ["REJECTED", "ACCEPTED"] },
    },
  });

  const successRate = await prisma.application.findMany({
    where: {
      userId: dbUser.id,
      status: { in: ["OFFER", "ACCEPTED"] },
    },
  });

  const rejectionRate = await prisma.application.findMany({
    where: {
      userId: dbUser.id,
      status: "REJECTED",
    },
  });

  const applicationWithInterviews = await prisma.application.findMany({
    where: {
      userId: dbUser.id,
      status: { in: ["INTERVIEW", "OFFER", "REJECTED", "ACCEPTED"] },
    },
    select: {
      dateApplied: true,
      nextInterviewDate: true,
    },
  });

  let totalResponseDays = 0;
  let countWithInterviews = 0;

  applicationWithInterviews.forEach((data) => {
    if (data.nextInterviewDate) {
      const days = Math.floor(
        (data.nextInterviewDate.getTime() - data.dateApplied.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      totalResponseDays += days;
      countWithInterviews++;
    }
  });

  const totalAverageResponseTime =
    countWithInterviews > 0 ? totalResponseDays / countWithInterviews : 0;

  return {
    totalApplications,
    activeApplications,
    successRate:
      totalApplications > 0
        ? (successRate.length / totalApplications) * 100
        : 0,
    rejectionRate:
      totalApplications > 0
        ? (rejectionRate.length / totalApplications) * 100
        : 0,
    averageResponseTime: Math.round(totalAverageResponseTime * 10) / 10,
    offersRecived: successRate.length,
    rejections: rejectionRate.length,
  };
}

// Get count of applications grouped by status (e.g., APPLIED, OFFER)

export async function getStatusDistribution() {
  const statusCounts = await Promise.all(
    Object.values(Status).map(async (status) => {
      const count = await prisma.application.count({
        where: {
          userId: dbUser.id,
          status: status,
        },
      });

      return { status, count };
    })
  );
  return statusCounts;
}

// Group applications by year-month for charting

export async function getTimeBasedAnalytics() {
  const applications = await prisma.application.findMany({
    where: {
      userId: dbUser.id,
    },
    select: {
      dateApplied: true,
    },
    orderBy: {
      dateApplied: "asc",
    },
  });

  // grouping monthly data

  const monthlyData = applications.reduce((acc, app) => {
    const month = `${app.dateApplied.getFullYear()} - ${(
      app.dateApplied.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month]++;
    return acc;
  }, {} as Record<string, number>);

  const timelineData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count,
  }));

  return timelineData;
}

// Get analytics by interview stage

export async function getInterviewStageAnalytics() {
  const interviewStageCounts = await Promise.all(
    Object.values(InterviewStage).map(async (stage) => {
      const count = await prisma.application.count({
        where: {
          userId: dbUser.id,
          interviewStage: stage,
        },
      });
      return { stage, count };
    })
  );

  return interviewStageCounts;
}

// Get analytics data by location (remote/on-place)

export async function getLocationAnalytics() {
  const remoteWork = await prisma.application.count({
    where: {
      userId: dbUser.id,
      remote: true,
    },
  });

  const onPlaceWork = await prisma.application.count({
    where: {
      userId: dbUser.id,
      remote: false,
    },
  });

  const notSpecifiedLocation = await prisma.application.count({
    where: {
      userId: dbUser.id,
      remote: null,
    },
  });

  const applications = await prisma.application.findMany({
    where: { userId: dbUser.id },
    select: {
      location: true,
    },
  });

  const locationData = applications.reduce((acc, app) => {
    const location = app.location || "not-specified";
    if (!acc[location]) {
      acc[location] = 0;
    }
    acc[location]++;

    return acc;
  }, {} as Record<string, number>);

  const locationDataBreakdown = Object.entries(locationData)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

  return {
    remoteDistribution: [
      { type: "Remote", count: remoteWork },
      { type: "Non-Remote", count: onPlaceWork },
      { type: "Unspecified", count: notSpecifiedLocation },
    ],

    locationDataBreakdown,
  };
}

// Get salary range analytics
export async function getSalaryAnalytics() {
  const applications = await prisma.application.findMany({
    where: {
      userId: dbUser.id,
      salaryRange: { not: "" },
    },
    select: {
      salaryRange: true,
      status: true,
    },
  });

  const salaryRanges = applications
    .map((app) => {
      const range = app.salaryRange || "";

      // Handle different salary formats like "$70,000-$90,000" or "70k-90k" or "70000-90000"
      const numbers = range.match(/\d+[k,]?\d*/g);

      if (numbers && numbers.length >= 2) {
        let min = parseFloat(numbers[0].replace(/[k,]/g, ""));
        let max = parseFloat(numbers[1].replace(/[k,]/g, ""));

        if (numbers[0].toLowerCase().includes("k")) {
          min *= 1000;
        }

        if (numbers[1].toLowerCase().includes("k")) {
          max *= 1000;
        }

        return {
          min,
          max,
          average: (min + max) / 2,
          status: app.status,
        };
      }

      return null;
    })
    .filter(Boolean);

  const salaryByStatus = Object.values(Status).reduce((acc, status) => {
    const statusSalaries = salaryRanges.filter(
      (range) => range?.status === status
    );
    const averageSalary =
      statusSalaries.length > 0
        ? statusSalaries.reduce(
            (sum, range) => sum + (range?.average || 0),
            0
          ) / statusSalaries.length
        : 0;

    acc[status] = {
      count: statusSalaries.length,
      averageSalary: Math.round(averageSalary),
    };

    return acc;
  }, {} as Record<string, { count: number; averageSalary: number }>);

  const salaryDistribution = salaryRanges.reduce((acc, range) => {
    if (!range) return acc;

    let bracket = "";
    if (range.average < 50000) bracket = "Under $50k";
    else if (range.average < 75000) bracket = "$50k-$75k";
    else if (range.average < 100000) bracket = "$75k-$100k";
    else if (range.average < 125000) bracket = "$100k-$125k";
    else if (range.average < 150000) bracket = "$125k-$150k";
    else bracket = "$150k+";

    if (!acc[bracket]) {
      acc[bracket] = 0;
    }

    acc[bracket]++;
    return acc;
  }, {} as Record<string, number>);

  const salaryDistributionArray = Object.entries(salaryDistribution)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => {
      const getMinValue = (range: string) => {
        if (range === "Under $50k") return 0;
        if (range === "$50k-$75k") return 50000;
        if (range === "$75k-$100k") return 75000;
        if (range === "$100k-$125k") return 100000;
        if (range === "$125k-$150k") return 125000;
        return 150000;
      };

      return getMinValue(a.range) - getMinValue(b.range);
    });

  return {
    salaryByStatus,
    salaryDistribution: salaryDistributionArray,
    averageMinSalary:
      salaryRanges.length > 0
        ? Math.round(
            salaryRanges.reduce((sum, range) => sum + (range?.min || 0), 0) /
              salaryRanges.length
          )
        : 0,
    averageMaxSalary:
      salaryRanges.length > 0
        ? Math.round(
            salaryRanges.reduce((sum, range) => sum + (range?.max || 0), 0) /
              salaryRanges.length
          )
        : 0,
  };
}

export async function getAllAnalyticsData() {
  const stats = await getApplicationStats();
  const statusDistribution = await getStatusDistribution();
  const timelineData = await getTimeBasedAnalytics();
  const interviewStageData = await getInterviewStageAnalytics();
  const locationData = await getLocationAnalytics();
  const salaryData = await getSalaryAnalytics();

  return {
    stats,
    statusDistribution,
    timelineData,
    interviewStageData,
    locationData,
    salaryData,
  };
}
