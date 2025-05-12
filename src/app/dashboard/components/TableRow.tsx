"use client";

import { Button } from "@/components/ui/button";
import { Application } from "@/lib/types";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TableRowProps {
  application: Application;
}

export default function TableRow({ application }: TableRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        key={application.id}
        className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
          application.notes ? "cursor-pointer" : ""
        }`}
        onClick={() => application.notes && setExpanded(!expanded)}
      >
        <td className="px-6 py-4">
          <div className="flex items-center">
            {application.notes && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {expanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            )}
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {application.jobTitle}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {application.company}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              application.status === "APPLIED"
                ? "bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300"
                : application.status === "INTERVIEW"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                : application.status === "OFFER"
                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                : application.status === "REJECTED"
                ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
            }`}
          >
            {application.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            {application.remote ? (
              <span>Remote</span>
            ) : (
              <span>{application.location || "Not specified"}</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Applied: {application.dateApplied.toLocaleDateString()}
          </div>
          {application.nextInterviewDate &&
            application.status !== "REJECTED" && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Next Round: {application.nextInterviewDate.toLocaleDateString()}
              </div>
            )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {application.salaryRange ? (
            <span>{application.salaryRange}</span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500 italic">
              Not specified
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {application.interviewStage ? (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                application.interviewStage === "SCREENING"
                  ? "bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-300"
                  : application.interviewStage === "HIRING_MANAGER"
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300"
                  : application.interviewStage === "TEAM"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                  : application.interviewStage === "FINAL"
                  ? "bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-300"
                  : application.interviewStage === "COMPLETED"
                  ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
              }`}
            >
              {application.interviewStage}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500 italic">
              Not specified
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex items-center space-x-4">
            {application.jobUrl ? (
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(application.jobUrl || "#", "_blank");
                }}
              >
                View
              </Button>
            ) : (
              <span className="text-gray-400 dark:text-gray-500 italic">
                Not specified
              </span>
            )}
            <Button
              className="text-indigo-600 cursor-pointer hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-gray-500 font-semibold transition-colors"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>

      {expanded && application.notes && (
        <tr className="bg-gray-50 dark:bg-gray-800/30">
          <td colSpan={7} className="px-6 py-4">
            <div>
              <div className="font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">
                Notes:
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap pl-2 border-l-2 border-gray-300 dark:border-gray-600">
                {application.notes}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
