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
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LocationData {
  location: string;
  count: number;
}

interface LocationChartProp {
  data: LocationData[];
}

const LOCATION_COLORS = [
  "#3b82f6",
  "#10b981",
  "#eab308",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#0ea5e9",
  "#84cc16",
  "#94a3b8",
];

export default function LocationChart({ data }: LocationChartProp) {
  const chartData = data
    .filter((loc) => loc.location !== "Unspecified")
    .slice(0, 8)
    .map((item, index) => ({
      name: item.location,
      Applications: item.count,
      color: LOCATION_COLORS[index % LOCATION_COLORS.length],
    }));

  console.log(chartData);
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Top Locations</CardTitle>
        <CardDescription>Application distribution by location</CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray={"3, 3"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={"Applications"}>
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
