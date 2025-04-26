"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicInfoInputs, basicInfoSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import { useForm } from "react-hook-form";

interface BasicInfoFormProps {
  onSubmit: (data: BasicInfoInputs) => void;
  defaultValues: Partial<BasicInfoInputs>;
}

export default function BasicInfoForm({
  onSubmit,
  defaultValues,
}: BasicInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoInputs>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      company: defaultValues.company || "",
      jobTitle: defaultValues.jobTitle || "",
      status: defaultValues.status || undefined,
      dateApplied: defaultValues.dateApplied || new Date(),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">Company</Label>
        <Input
          type="text"
          className="w-full p-2 border rounded "
          {...register("company")}
          required
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">Job Title</Label>
        <Input
          type="text"
          className="w-full p-2 border rounded"
          {...register("jobTitle")}
          required
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">Status</Label>
        <select className="w-full p-2 border rounded" {...register("status")} required>
          {Object.values(Status).map((status) => (
            <option
              key={status}
              value={status}
              className="bg-background text-foreground"
            >
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-1 text-xl font-semibold">Date Applied</Label>
        <Input
          type="date"
          className="w-full p-2 border rounded"
          {...register("dateApplied", {
            setValueAs: (value) => (value ? new Date(value) : new Date()),
          })}
          required
        />
        {errors.dateApplied && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateApplied.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-base font-semibold"
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
