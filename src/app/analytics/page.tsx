import { Suspense } from "react";
import { Analytics } from "./components/Analytics";
import Loading from "./components/Loading";

export default function AnalyticsPage() {
  return (
    <>
      <Suspense
        fallback={
          <Loading/>
        }
      >
        <Analytics />
      </Suspense>
    </>
  );
}
