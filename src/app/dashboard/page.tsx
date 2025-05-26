import { getUserApplications } from "@/actions/applications";
import TableLayout from "./components/TableLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./components/loading";

export default async function Applications() {
  const applications = await getUserApplications();
  return (
    <section className="mt-5">
      <header className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
        <div>
          <h1 className="text-3xl font-bold">Applications Dashboard</h1>
        </div>
        <Button className="dark:bg-gray-700 dark:text-white">
          <Link href={"/applications/new"}>Add New Application</Link>
        </Button>
      </header>

      <Suspense fallback={<Loading/>}>
        <TableLayout applications={applications}/>
      </Suspense>
    </section>
  );
}
