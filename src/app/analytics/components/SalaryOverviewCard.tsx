import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SalaryData {
  averageMinSalary: number;
  averageMaxSalary: number;
}

interface SalaryOverviewCardProp {
  data: SalaryData;
}

export default function SalaryOverviewCard({ data }: SalaryOverviewCardProp) {
  const formatIndianCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Salary Overview</CardTitle>
        <CardDescription>Average min and max salary ranges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 items-center">
          <div>
            <p className="text-sm font-medium">Average Minimum Salary</p>
            <p className="text-2xl font-bold">
              {formatIndianCurrency(data.averageMinSalary)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Average Maximum Salary</p>
            <p className="text-2xl font-bold">
              {formatIndianCurrency(data.averageMaxSalary)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Average Salary Range</p>
            <p className="text-lg">
              {formatIndianCurrency(data.averageMinSalary)} -{" "}
              {formatIndianCurrency(data.averageMaxSalary)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
