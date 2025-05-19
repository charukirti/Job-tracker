import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "../toggler";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href={"/"}>
        {" "}
        <h1 className="text-2xl font-extrabold">Job Tracker</h1>
      </Link>

      <nav className="flex items-center gap-2">
        <SignedOut>
          <SignInButton>
            <Button variant={"default"} className="text-base space-x-2 ">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button variant={"default"} className="text-base space-x-2 ">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Button asChild size={"lg"} className="w-20 h-20 ">
            <UserButton />
          </Button>
        </SignedIn>
        <ModeToggle />
      </nav>
    </header>
  );
}
