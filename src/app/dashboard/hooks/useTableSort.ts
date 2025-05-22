"use client";

import { Application } from "@/lib/types";
import { useMemo, useState } from "react";

type SortField =
  | "jobTitle"
  | "company"
  | "status"
  | "dateApplied"
  | "nextInterviewDate"
  | "salaryRange";
type SortOrder = "asc" | "desc";

export function useTableSort(application: Application[]) {
  const [sortField, setSortField] = useState<SortField>("dateApplied");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortApplications = useMemo(() => {
    const sorted = [...application];

    sorted.sort((a, b) => {
      let valueOne: any;
      let valueTwo: any;

      switch (sortField) {
        case "jobTitle":
          valueOne = a.jobTitle.toLowerCase();
          valueTwo = b.jobTitle.toLowerCase();
          break;
        case "company":
          valueOne = a.company.toLowerCase();
          valueTwo = b.company.toLowerCase();
          break;
        case "dateApplied":
          valueOne = a.dateApplied.getTime();
          valueTwo = b.dateApplied.getTime();
          break;
        case "nextInterviewDate":
          valueOne = a.nextInterviewDate?.getTime() || 0;
          valueTwo = b.nextInterviewDate?.getTime() || 0;
          break;
        case "salaryRange":
          const extract = (range: string | null) => {
            if (!range) return 0;
            const numbers = range.match(/\d+/g);
            return numbers ? parseInt(numbers[0]) : 0;
          };

          valueOne = extract(a.salaryRange);
          valueTwo = extract(b.salaryRange);
          break;
        default:
          valueOne = a.dateApplied.getTime();
          valueTwo = b.dateApplied.getTime();
      }

      if (sortOrder === "asc") {
        return valueOne > valueTwo ? 1 : -1;
      } else {
        return valueOne < valueTwo ? 1 : -1;
      }
    });

    return sorted;
  }, [application, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return {
    sortField,
    sortOrder,
    sortApplications,
    handleSort,
  };
}
