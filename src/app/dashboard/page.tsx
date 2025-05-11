import { getUserApplications } from "@/actions/applications";
import TableLayout from "./components/TableLayout";

export default async function Applications() {
  const applications = await getUserApplications();
  return (
    <section>
      <h1>Applications Dashboard</h1>

      <TableLayout applications={applications} />
    </section>
  );
}
