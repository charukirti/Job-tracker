import { getApplicationById } from "@/actions/applications";
import { notFound } from "next/navigation";
import EditApplicationForm from "../../components/EditApplicationForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditApplication({ params }: PageProps) {
  const id = params.id;

  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  return (
    <>
      <EditApplicationForm application={application} />
    </>
  );
}
