import { $Enums } from "@prisma/client";

export type Application = {
  id: string;
  company: string;
  jobTitle: string;
  status: $Enums.Status;
  dateApplied: Date;
  notes: string | null;
  jobUrl: string | null;
  location: string | null;
  remote: boolean | null;
  salaryRange: string | null;
  nextInterviewDate: Date | null;
  interviewStage: $Enums.InterviewStage | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface TableLayoutProp {
  applications: Application[];
}
