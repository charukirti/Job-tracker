import { getUserApplications } from "@/actions/applications"

export default async function Applications() {
    const applications = await getUserApplications()
    console.log(applications)
    return (
        <h1>
            Applications Dashboard
        </h1>
    )
}

