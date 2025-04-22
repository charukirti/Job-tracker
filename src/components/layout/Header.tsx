import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "../toggler";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold">Job Tracker</h1>

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
