import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between mt-5">
      <h1 className="text-2xl font-bold">JOB Tracker</h1>
      <nav className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </nav>
    </header>
  );
}
