import { Suspense } from "react";
import { Analytics } from "./components/Analytics";

export default function AnalyticsPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading analytics...
          </div>
        }
      >
        <Analytics />
      </Suspense>
    </>
  );
}
