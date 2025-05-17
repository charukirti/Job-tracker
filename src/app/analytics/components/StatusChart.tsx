"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const STATUS_COLORS = {
  WISHLIST: "#94a3b8",
  APPLIED: "#3b82f6",
  INTERVIEW: "#eab308",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  ACCEPTED: "#8b5cf6",
};

interface StatusCardProp {
  data: any[];
}
const formatStatus = (status: string) => {
  return status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ");
};

export default function StatusChart({ data }: StatusCardProp) {
  const chartsData = data
    .map((item) => ({
      name: formatStatus(item.status),
      value: item.count,
      color: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS],
    }))
    .filter((item) => item.value > 0);
  return (
    <Card className="col-span-1 md:col-span-2 mt-5">
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width={"100%"} height={"100%"} className="border">
          <PieChart>
            <Pie
              data={chartsData}
              cx={"50%"}
              cy={"50%"}
              labelLine={true}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey={"value"}
              nameKey={"name"}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} applications`, "Total"]}
            />

            <Legend formatter={(value) => value} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
