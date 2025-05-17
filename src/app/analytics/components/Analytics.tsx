import { getAllAnalyticsData } from "@/actions/analytics";
import StatsCard from "./StatsCard";
import StatusChart from "./StatusChart";
import TimelineChart from "./TimelineChart";
import InterviewStageChart from "./InterviewStageChart";
import RemoteWorkChart from "./RemoteWorkChart";
import LocationChart from "./LocationChart";
import SalaryOverviewCard from "./SalaryOverviewCard";

export async function Analytics() {
  const {
    stats,
    statusDistribution,
    timelineData,
    interviewStageData,
    locationData,
    salaryData,
  } = await getAllAnalyticsData();
  return (
    <main className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Your Analytics</h1>
      </div>
      <StatsCard stats={stats} />
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusChart data={statusDistribution} />
        <TimelineChart data={timelineData} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InterviewStageChart data={interviewStageData} />
        <RemoteWorkChart data={locationData.remoteDistribution} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <LocationChart data={locationData.locationDataBreakdown} />
        <SalaryOverviewCard data={salaryData} />
      </section>
    </main>
  );
}
