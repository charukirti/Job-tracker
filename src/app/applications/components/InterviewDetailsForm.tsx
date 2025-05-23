"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  InterviewDetailsInputs,
  interviewDetailsSchema,
  InterviewStage,
} from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import DateInput from "./DateInput";

interface InterviewDetailsFormProps {
  onSubmit: (data: InterviewDetailsInputs) => void;
  defaultValues: Partial<InterviewDetailsInputs>;
  isPending?: boolean
}

export default function InterviewDetailsForm({
  onSubmit,
  defaultValues,
  isPending
}: InterviewDetailsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InterviewDetailsInputs>({
    resolver: zodResolver(interviewDetailsSchema),
    defaultValues: {
      interviewStage: defaultValues.interviewStage || undefined,
      nextInterviewDate: defaultValues.nextInterviewDate || undefined,
      notes: defaultValues.notes || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">
          Interview Type/Stage
        </Label>

        <select
          className="w-full p-2 border rounded"
          {...register("interviewStage")}
        >
          <option value="">Select a stage</option>
          {Object.values(InterviewStage).map((stage) => (
            <option
              key={stage}
              value={stage}
              className="bg-background text-foreground"
            >
              {stage.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        {errors.interviewStage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.interviewStage.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">
          Next Interview Date
        </Label>

        <Controller
          name="nextInterviewDate"
          control={control}
          render={({ field }) => (
            <DateInput
              value={field.value}
              onChange={(dateStr) => {
                field.onChange(dateStr ? new Date(dateStr) : undefined);
              }}
              name="nextInterviewDate"
            />
          )}
        />
        
        {errors.nextInterviewDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nextInterviewDate.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1">Notes</Label>
        <Textarea
          className="w-full p-2 border rounded h-32"
          placeholder="Add any important details or interview feedback here"
          {...register("notes")}
        ></Textarea>
      </div>

      <div className="flex justify-end ">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-base font-semibold cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          Add Application
        </Button>
      </div>
    </form>
  );
}