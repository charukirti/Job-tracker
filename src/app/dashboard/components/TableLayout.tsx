"use client";

import { Application } from "@/lib/types";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

interface TableLayoutProp {
  applications: Application[];
}

export default function TableLayout({ applications }: TableLayoutProp) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <TableHeader heading="Job & Company" />
            <TableHeader heading="Status" />
            <TableHeader heading="Location" />
            <TableHeader heading="Dates" />
            <TableHeader heading="Salary" />
            <TableHeader heading="Stage" />
            <TableHeader heading="Actions" />
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {applications.map((application) => (
            <TableRow application={application} key={application.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
