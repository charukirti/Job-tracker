"use client";

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
import { useState } from "react";
import { Briefcase, Menu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/analytics", label: "Analytics" },
  ];
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full py-3">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-extrabold">Job Tracker</h1>
        </Link>

        <div className="hidden md:flex items-center">
          <Tabs defaultValue="home" className="mr-4">
            <TabsList className=" h-10 p-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <TabsTrigger
                    value={item.label.toLowerCase()}
                    className="text-lg cursor-pointer"
                  >
                    {item.label}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile menu */}

        <nav className="flex items-center gap-2">
          <div className="flex md:hidden mr-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader className="hidden">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Access different sections of Job Tracker
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <SignedOut>
            <SignInButton>
              <Button variant="default" className="text-sm md:text-base">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button variant="outline" className="text-sm md:text-base">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
