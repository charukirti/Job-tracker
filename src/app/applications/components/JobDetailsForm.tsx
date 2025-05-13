"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobDetailsInput, jobDetailsSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface JobDetailsFormProps {
  onSubmit: (data: JobDetailsInput) => void;
  defaultValues: Partial<JobDetailsInput>;
}

export default function JobDetailsForm({
  onSubmit,
  defaultValues,
}: JobDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobDetailsInput>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      jobUrl: defaultValues.jobUrl || "",
      location: defaultValues.location || "",
      remote: defaultValues.remote || false,
      salaryRange: defaultValues.salaryRange || "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">
          Job application URL
        </Label>
        <Input
          type="text"
          className="w-full p-2 border rounded "
          {...register("jobUrl")}
          required
        />
        {errors.jobUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.jobUrl.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">
          Company Location
        </Label>
        <Input
          type="text"
          className="w-full p-2 border rounded "
          {...register("location")}
          required
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="flex items-center text-xl font-semibold">
          <input type="checkbox" className="mr-2" {...register("remote")} />
          Remote Position
        </label>
        {errors.remote && (
          <p className="text-red-500 text-sm mt-1">{errors.remote.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block text-xl mb-1 font-semibold">Salary range</Label>
        <Input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="e.g $80,000 - $100,000"
          {...register("salaryRange")}
          required
        />
      </div>

      <div className="flex justify-end ">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-base font-semibold cursor-pointer"
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
