"use server";

import prisma from "@/lib/prisma";
import { getOrCreateUser } from "./user";
import { InterviewStage, Status } from "@prisma/client";
import { redirect } from "next/navigation";

// newly add applications

export async function addApplications(formData: FormData) {
  const dbUser = await getOrCreateUser();

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

      user: {
        connect: { id: dbUser.id },
      },
    },
  });

  console.log(application);

  redirect("/");
}

// get all applications

export async function getUserApplications() {
  const dbUser = await getOrCreateUser();

  const applications = await prisma.application.findMany({
    where: {
      userId:  dbUser.id,
    },
    orderBy: {
      dateApplied: "desc",
    },
  });
  console.log(applications);
  return applications;
}
