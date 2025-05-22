"use client";

import { Button } from "@/components/ui/button";

interface TableFiltersProps {
  show: boolean;
  statusFilter: string;
  locationFilter: string;
  uniqueStatuses: string[];
  uniqueLocations: string[];
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function TableFilters({
  show,
  statusFilter,
  uniqueStatuses,
  uniqueLocations,
  onClearFilters,
  locationFilter,
  onStatusChange,
  onLocationChange,
}: TableFiltersProps) {

    if (!show) return null;
  return (
    <section className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="ALL">All Statuses</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <select
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="ALL">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
