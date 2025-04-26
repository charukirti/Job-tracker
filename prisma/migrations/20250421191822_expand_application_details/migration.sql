-- CreateEnum
CREATE TYPE "InterviewStage" AS ENUM ('SCREENING', 'TECHNICAL', 'HIRING_MANAGER', 'TEAM', 'FINAL', 'COMPLETED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "interviewStage" "InterviewStage",
ADD COLUMN     "jobUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "nextInterviewDate" TIMESTAMP(3),
ADD COLUMN     "remote" BOOLEAN,
ADD COLUMN     "salaryRange" TEXT;
