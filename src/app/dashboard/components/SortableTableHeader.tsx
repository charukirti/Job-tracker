'use client'

import { SortAsc, SortDesc } from "lucide-react";

type SortField = 'jobTitle' | 'company' | 'status' | 'dateApplied' | 'nextInterviewDate' | 'salaryRange';
type SortOrder = 'asc' | 'desc';

interface SortableTableHeaderProps {
  heading: string;
  sortField: SortField;
  currentSortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function SortableTableHeader({ 
  heading, 
  sortField, 
  currentSortField, 
  sortOrder, 
  onSort 
}: SortableTableHeaderProps) {
  const isActive = currentSortField === sortField;
  
  return (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-lg font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={() => onSort(sortField)}
    >
      <div className="flex items-center gap-2">
        {heading}
        {isActive ? (
          sortOrder === 'asc' ? (
            <SortAsc size={16} className="text-blue-500" />
          ) : (
            <SortDesc size={16} className="text-blue-500" />
          )
        ) : (
          <div className="w-4 h-4 opacity-30">
            <SortAsc size={16} />
          </div>
        )}
      </div>
    </th>
  );
}