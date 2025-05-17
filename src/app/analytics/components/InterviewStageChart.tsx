"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const INTERVIEW_COLORS = {
  SCREENING: "#94a3b8",
  TECHNICAL: "#3b82f6",
  HIRING_MANAGER: "#eab308",
  TEAM: "#10b981",
  FINAL: "#8b5cf6",
  COMPLETED: "#14b8a6",
};

interface InterviewStageProp {
  data: any[];
}

const formatInterviewStage = (stage: string) => {
  return stage
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

export default function InterviewStageChart({ data }: InterviewStageProp) {
  const chartData = data
    .map((item) => ({
      name: formatInterviewStage(item.stage),
      value: item.count,
      color: INTERVIEW_COLORS[item.stage as keyof typeof INTERVIEW_COLORS],
    }))
    .filter((item) => item.value > 0);
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Interview Stages</CardTitle>
        <CardDescription>
          Distribution of application by interview stage
        </CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip formatter={(value: number) => [value, "Applications"]} />
            <Bar dataKey={"value"} name={"Applications"}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
