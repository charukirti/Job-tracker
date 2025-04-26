import { z } from "zod";

export enum Status {
  WISHLIST = "WISHLIST",
  APPLIED = "APPLIED",
  INTERVIEW = "INTERVIEW",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export enum InterviewStage {
  SCREENING = "SCREENING",
  TECHNICAL = "TECHNICAL",
  HIRING_MANAGER = "HIRING_MANAGER",
  TEAM = "TEAM",
  FINAL = "FINAL",
  COMPLETED = "COMPLETED",
}



// validation schemas

export const basicInfoSchema = z.object({
  company: z.string().min(1, "Company is required!"),
  jobTitle: z.string().min(1, "Job title is required"),
  status: z.nativeEnum(Status),
  dateApplied: z.date(),
});

export const jobDetailsSchema = z.object({
  jobUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  salaryRange: z.string().optional(),
});

export const interviewDetailsSchema = z.object({
  interviewStage: z.nativeEnum(InterviewStage).optional(),
  nextInterviewDate: z.date().optional(),
  notes: z.string().optional(),
});

// types for each step

export type BasicInfoInputs = z.infer<typeof basicInfoSchema>;
export type JobDetailsInput = z.infer<typeof jobDetailsSchema>;
export type InterviewDetailsInputs = z.infer<typeof interviewDetailsSchema>;

// combined schema and type

export const applicationSchema = basicInfoSchema
  .merge(jobDetailsSchema)
  .merge(interviewDetailsSchema);
export type ApplicationInputs = z.infer<typeof applicationSchema>;