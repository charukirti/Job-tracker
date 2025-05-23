import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section
        className="max-w-6xl mx-auto sm:px-8 h-screen mt-10 grid lg:grid-cols-[1fr_600px] gap-5
 items-center"
      >
        <div className="text-center md:text-left">
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            <span className="text-primary dark:text-purple-400 mr-2">
              effortless
            </span>
            job management
          </h1>

          <p className="mx-8 md:mx-0 mt-4">
            Take control of your job search with our easy to use app that helps
            you manage applications, track progress, and stay organized every
            step of the way.
          </p>

          <Button
            className="mt-4 mr-2 text-base font-semibold cursor-pointer"
            asChild
            size={"lg"}
          >
            <Link href={"/applications/new"}>Get Started</Link>
          </Button>
          <Button
            className="mt-4 text-base font-semibold cursor-pointer"
            asChild
            size={"lg"}
            variant="outline"
          >
            <Link href={"/dashboard"}>Your Jobs</Link>
          </Button>
        </div>

        <div>
          <Image
            src={"/job.png"}
            alt="person applying for job"
            width={500}
            height={500}
          />
        </div>
      </section>
    </main>
  );
}
