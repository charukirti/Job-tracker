import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section
        className="max-w-6xl mx-auto sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr_600px] gap-3
 items-center"
      >
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            <span className="text-primary dark:text-purple-400">
              effortless
            </span>{" "}
            job management
          </h1>

          <p className="leading-loose max-w-md mt-4">
            Take control of your job search with our easy to use app that helps
            you manage applications, track progress, and stay organized every
            step of the way.
          </p>

          <Button className="mt-4 text-base font-semibold" asChild size={"lg"}>
            <Link href={"/applications/new"}>Get Started</Link>
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
