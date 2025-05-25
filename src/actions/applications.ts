"use server";

import prisma from "@/lib/prisma";
import { InterviewStage, Status } from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

const getCachedApplications = unstable_cache(
  async () => {
    console.log("Fetching applications from database...");
    const applications = await prisma.application.findMany({
      orderBy: {
        dateApplied: "desc",
      },
    });
    return applications;
  },
  ["user-applications"],
  {
    tags: ["applications"],
    revalidate: 60,
  }
);

const getCachedApplicationByID = unstable_cache(
  async (id: string) => {
    console.log("getting application by id (cached)");

    const application = await prisma.application.findFirst({
      where: { id },
    });
    return application;
  },
  [],
  {
    tags: ["applications"],
    revalidate: 60,
  }
);

// newly add applications

export async function addApplications(formData: FormData) {
  const company = formData.get("company") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const statusValue = (formData.get("status") as string) || "WISHLIST";
  const dateApplied = formData.get("dateApplied") as string;
  const notes = (formData.get("notes") as string) || "";
  const jobUrl = (formData.get("jobUrl") as string) || "";
  const location = (formData.get("location") as string) || "";

  const remoteValue = formData.get("remote");
  const remote = remoteValue === "true" || remoteValue == "on";

  const salaryRange = (formData.get("salaryRange") as string) || "";

  const nextInterviewDateStr = formData.get("interviewDate") as string;
  const nextInterviewDate = nextInterviewDateStr
    ? new Date(nextInterviewDateStr)
    : null;

  const interviewStageValue = formData.get("interviewStage") || "SCREENING";

  const status = Object.values(Status).includes(statusValue as Status)
    ? (statusValue as Status)
    : ("WISHLIST" as Status);

  const interviewStage = Object.values(InterviewStage).includes(
    interviewStageValue as InterviewStage
  )
    ? (interviewStageValue as InterviewStage)
    : ("SCREENING" as InterviewStage);

  const application = await prisma.application.create({
    data: {
      company,
      jobTitle,
      status,
      dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
      notes,
      jobUrl,
      location,
      remote,
      salaryRange,
      nextInterviewDate,
      interviewStage,
    },
  });

  console.log(application);
  revalidateTag("applications");
  revalidatePath("/dashboard");
  return { success: true };
}

// get all applications

export async function getUserApplications() {
  return await getCachedApplications();
}

// get application with id (not implemented cacheing)

export async function getApplicationById(id: string) {
  return await getCachedApplicationByID(id);
}

//  updating existing application

export async function updateApplication(formData: FormData) {
  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const statusValue = (formData.get("status") as string) || "WISHLIST";
  const dateApplied = formData.get("dateApplied") as string;
  const notes = (formData.get("notes") as string) || "";
  const jobUrl = (formData.get("jobUrl") as string) || "";
  const location = (formData.get("location") as string) || "";

  const remoteValue = formData.get("remote");
  const remote = remoteValue === "true" || remoteValue == "on";

  const salaryRange = (formData.get("salaryRange") as string) || "";

  const nextInterviewDateStr = formData.get("interviewDate") as string;
  const nextInterviewDate = nextInterviewDateStr
    ? new Date(nextInterviewDateStr)
    : null;

  const interviewStageValue = formData.get("interviewStage") || "SCREENING";

  const status = Object.values(Status).includes(statusValue as Status)
    ? (statusValue as Status)
    : ("WISHLIST" as Status);

  const interviewStage = Object.values(InterviewStage).includes(
    interviewStageValue as InterviewStage
  )
    ? (interviewStageValue as InterviewStage)
    : ("SCREENING" as InterviewStage);

  const existingApplication = await prisma.application.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingApplication) {
    throw new Error("Application not found");
  }

  const updatedApplication = await prisma.application.update({
    where: {
      id: id,
    },
    data: {
      company,
      jobTitle,
      status,
      dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
      notes,
      jobUrl,
      location,
      remote,
      salaryRange,
      nextInterviewDate,
      interviewStage,
    },
  });

  console.log("Application updated", updatedApplication);

  revalidateTag("applications");
  revalidatePath("/dashboard");

  return { success: true };
}

// deleting application

export async function deleteApplication(formData: FormData) {
  const id = formData.get("id") as string;

  const existingApplication = await prisma.application.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingApplication) {
    throw new Error("Application not found");
  }

  await prisma.application.delete({
    where: {
      id: id,
    },
  });

  console.log("Application deleted", id);

  revalidateTag("applications");
  revalidatePath("/dashboard");

  return { success: true };
}
