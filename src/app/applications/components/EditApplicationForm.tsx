"use client";

import { Button } from "@/components/ui/button";
import {
  ApplicationInputs,
  BasicInfoInputs,
  InterviewDetailsInputs,
  InterviewStage,
  JobDetailsInput,
  Status,
} from "@/lib/formSchema";
import { Application } from "@prisma/client";
import { useState, useTransition } from "react";
import InterviewDetailsForm from "./InterviewDetailsForm";
import JobDetailsForm from "./JobDetailsForm";
import BasicInfoForm from "./BasicInfoForm";
import { updateApplication } from "@/actions/applications";

interface EditApplicationFormProps {
  application: Application;
}

export default function EditApplicationForm({
  application,
}: EditApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ApplicationInputs>>({
    company: application.company,
    jobTitle: application.jobTitle,

    status: application.status as unknown as Status,
    dateApplied: application.dateApplied,
    jobUrl: application.jobUrl || "",
    location: application.location || "",
    remote: application.remote || false,
    salaryRange: application.salaryRange || "",

    interviewStage: application.interviewStage
      ? (application.interviewStage as unknown as InterviewStage)
      : undefined,
    nextInterviewDate: application.nextInterviewDate
      ? new Date(application.nextInterviewDate)
      : undefined,
    notes: application.notes || "",
  });
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState("");

  const steps = ["Basic Info", "Job Details", "Interview Details"];

  const handleBasicInfoSubmit = (data: BasicInfoInputs) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    setCurrentStep(1);
  };

  const handleJobDetailsSubmit = (data: JobDetailsInput) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    setCurrentStep(2);
  };

  const handleInterviewDetailsSubmit = (data: InterviewDetailsInputs) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    // final submission logic for update
    startTransition(async () => {
      try {
        const formData = new FormData();

        // Set the application ID for update
        formData.append("id", application.id);

        // Basic info
        if (updatedFormData.company)
          formData.append("company", updatedFormData.company);
        if (updatedFormData.jobTitle)
          formData.append("jobTitle", updatedFormData.jobTitle);
        if (updatedFormData.status)
          formData.append("status", updatedFormData.status);
        if (updatedFormData.dateApplied)
          formData.append(
            "dateApplied",
            updatedFormData.dateApplied.toISOString()
          );

        // Job details
        if (updatedFormData.jobUrl)
          formData.append("jobUrl", updatedFormData.jobUrl);
        if (updatedFormData.location)
          formData.append("location", updatedFormData.location);
        if (updatedFormData.remote !== undefined)
          formData.append("remote", updatedFormData.remote.toString());
        if (updatedFormData.salaryRange)
          formData.append("salaryRange", updatedFormData.salaryRange);

        // Interview details
        if (updatedFormData.interviewStage)
          formData.append("interviewStage", updatedFormData.interviewStage);
        if (updatedFormData.nextInterviewDate)
          formData.append(
            "interviewDate",
            updatedFormData.nextInterviewDate.toISOString()
          );
        if (updatedFormData.notes)
          formData.append("notes", updatedFormData.notes);

        console.log("Updated form data submitted", updatedFormData);

        await updateApplication(formData);
      } catch (error) {
        console.log("An error occurred", error);
        setFormError("Failed to update application. Please try again.");
      }
    });
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoForm
            onSubmit={handleBasicInfoSubmit}
            defaultValues={formData}
          />
        );
      case 1:
        return (
          <JobDetailsForm
            onSubmit={handleJobDetailsSubmit}
            defaultValues={formData}
          />
        );
      case 2:
        return (
          <InterviewDetailsForm
            onSubmit={handleInterviewDetailsSubmit}
            defaultValues={formData}
          />
        );
    }
  };

  return (
    <section className="max-w-md lg:max-w-9/12 mx-auto p-6 rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-6">Edit Job Application</h2>

      <div className="mb-6">
        <ol className="flex justify-between">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`flex items-center text-xl font-semibold ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
                  index <= currentStep ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {formError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {formError}
        </div>
      )}

      {renderForm()}

      <div className="flex justify-between -mt-9">
        {currentStep > 0 && (
          <Button
            type="button"
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-base font-semibold cursor-pointer"
          >
            Previous
          </Button>
        )}
      </div>
    </section>
  );
}
