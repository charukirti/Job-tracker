import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  stats: any;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm lg:text-xl font-medium">
            Total Applications
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">{stats.totalApplications} </div>
          <p className="text-xs text-right text-muted-foreground">
            {stats.activeApplications} Currently active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm lg:text-xl font-medium">Success Rate</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {stats.successRate.toFixed(1)}%
          </div>
          <p className="text-xs text-right text-muted-foreground">
            {stats.offersReceived} offers received
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm lg:text-xl font-medium">Response Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(100 - stats.rejectionRate).toFixed(1)}%
          </div>
          <p className="text-xs text-right text-muted-foreground">
            {stats.rejections} rejections
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm lg:text-xl font-medium">
            Avg. Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageResponseTime} days
          </div>
          <p className="text-xs text-right text-muted-foreground">
            From application to interview
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
