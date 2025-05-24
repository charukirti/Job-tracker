"use client";

import { Application } from "@/lib/types";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { useState } from "react";
import { useTableFilters } from "../hooks/useTableFilters";
import { useTableSort } from "../hooks/useTableSort";
import { useExportTable } from "../hooks/useExportTable";
import TableControls from "./TableControls";
import TableFilters from "./TableFilters";
import { SortableTableHeader } from "./SortableTableHeader";

interface TableLayoutProp {
  applications: Application[];
}

export default function TableLayout({ applications }: TableLayoutProp) {
  const [showFilters, setShowFilters] = useState(false)

  const { searchTerm, setSearchTerm, filterStatus, filterLocation, uniqueStatuses, uniqueLocations, setFilterStatus, setFilterLocation, clearFilters, filteredApplications } = useTableFilters(applications)
  
  const { sortField, sortOrder, sortApplications, handleSort } = useTableSort(filteredApplications)
  
  const { exportCSV } = useExportTable()
  
  const filteredApplicationList = sortApplications
  return (


    <section className="space-y-4">
      <TableControls searchTerm={searchTerm} onSearchChange={setSearchTerm} onToggleFilters={() => setShowFilters(!showFilters)} onExport={() => exportCSV(filteredApplicationList)} />
      
      <TableFilters show={showFilters} statusFilter={filterStatus} locationFilter={filterLocation} uniqueStatuses={uniqueStatuses} uniqueLocations={uniqueLocations} onStatusChange={setFilterStatus} onLocationChange={setFilterLocation} onClearFilters={clearFilters} />
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredApplicationList.length} of {applications.length} applications
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <SortableTableHeader 
                heading="Job & Company" 
                sortField="jobTitle"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHeader 
                heading="Status" 
                sortField="status"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader heading="Location" />
              <SortableTableHeader 
                heading="Dates" 
                sortField="dateApplied"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTableHeader 
                heading="Salary" 
                sortField="salaryRange"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader heading="Stage" />
              <TableHeader heading="Actions" />
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {filteredApplicationList.length > 0 ? (
              filteredApplicationList.map((application) => (
                <TableRow application={application} key={application.id} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No applications found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
