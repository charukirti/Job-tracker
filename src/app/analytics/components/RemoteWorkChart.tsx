"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RemoteworkChartProps {
  data: any[];
}

export default function RemoteWorkChart({ data }: RemoteworkChartProps) {
  const chartData = data
    .map((item, index) => ({
      name: item.type,
      value: item.count,
      color: ["#10b981", "#3b82f6", "#94a3b8"][index],
    }))
    .filter((item) => item.value > 0);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Remote Work</CardTitle>
        <CardDescription>Remote vs Non-Remote positions</CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width={"100%"} height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx={"50%"}
              cy={"50%"}
              labelLine={true}
              outerRadius={120}
              fill="#8884d8"
              dataKey={"value"}
              nameKey={"name"}
              label={({ name, percent }) =>
                `${name} : ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => [`${value} applications`, "count"]}
            />
            <Legend formatter={(value) => value} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
