"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface DateInputProps {
  value: Date | undefined;
  onChange: (date: string) => void;
  name: string;
  className?: string;
  required?: boolean;
}

export default function DateInput({
  value,
  onChange,
  name,
  className,
  required,
}: DateInputProps) {
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return "";

    const validDate = new Date(date);

    if (isNaN(validDate.getTime())) return "";

    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, "0");
    const day = String(validDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [dateValue, setDateValue] = useState<string>(formatDateForInput(value));

  useEffect(() => {
    setDateValue(formatDateForInput(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDateValue(newValue);
    onChange(newValue);
  };

  return (
    <Input
      type="date"
      name={name}
      value={dateValue}
      onChange={handleChange}
      className={`w-full p-2 border rounded ${className}`}
      required={required}
    />
  );
}
