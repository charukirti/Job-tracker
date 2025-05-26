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
      let valueOne: string | number;
      let valueTwo: string | number;

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
          const dateA = a.dateApplied instanceof Date ? a.dateApplied : new Date(a.dateApplied);
          const dateB = b.dateApplied instanceof Date ? b.dateApplied : new Date(b.dateApplied);
          valueOne = dateA.getTime();
          valueTwo = dateB.getTime();
          break;
        case "nextInterviewDate":
          const nextDateA = a.nextInterviewDate 
          ? (a.nextInterviewDate instanceof Date ? a.nextInterviewDate : new Date(a.nextInterviewDate))
          : null;
        const nextDateB = b.nextInterviewDate 
          ? (b.nextInterviewDate instanceof Date ? b.nextInterviewDate : new Date(b.nextInterviewDate))
          : null;
        valueOne = nextDateA?.getTime() || 0;
        valueTwo = nextDateB?.getTime() || 0;
        break;
        case "salaryRange":
          const extract = (range: string | null): number => {
            if (!range) return 0;
            const numbers = range.match(/\d+/g);
            return numbers ? parseInt(numbers[0]) : 0;
          };

          valueOne = extract(a.salaryRange);
          valueTwo = extract(b.salaryRange);
          break;
        default:
          const defaultDateA = a.dateApplied instanceof Date ? a.dateApplied : new Date(a.dateApplied);
          const defaultDateB = b.dateApplied instanceof Date ? b.dateApplied : new Date(b.dateApplied);
          valueOne = defaultDateA.getTime();
          valueTwo = defaultDateB.getTime();
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