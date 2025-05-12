import { getUserApplications } from "@/actions/applications";
import TableLayout from "./components/TableLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Applications() {
  const applications = await getUserApplications();
  return (
    <section className="mt-5">
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-3xl font-bold">Applications Dashboard</h1>
          <p className="text-lg">All your applied jobs will be visible here</p>
        </div>
        <Button>
          <Link href={"/applications/new"}>Add New Application</Link>
        </Button>
      </header>

      <TableLayout applications={applications} />
    </section>
  );
}
