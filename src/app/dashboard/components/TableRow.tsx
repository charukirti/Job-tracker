import { Button } from "@/components/ui/button";
import { Application } from "@/lib/types";

interface TableRowProps {
  application: Application;
}

export default function TableRow({ application }: TableRowProps) {
  return (
    <tr
      key={application.id}
      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
            {application.jobTitle}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {application.company}
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
            <span>{application.location || "N/A"}</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Applied: {application.dateApplied.toLocaleDateString()}
        </div>
        {application.nextInterviewDate && application.status !== "REJECTED" && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Next: {application.nextInterviewDate.toLocaleDateString()}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {application.salaryRange || "N/A"}
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
          <span className="text-sm text-gray-500 dark:text-gray-400">N/A</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex space-x-4">
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View
            </a>
          )}
          <Button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            Edit
          </Button>
        </div>
      </td>
    </tr>
  );
}
