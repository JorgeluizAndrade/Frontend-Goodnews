"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary">
                🗞️ GOODNEWS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="#posts"
                  className="text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Posts
                </Link>
                <Link
                  href="#biblex"
                  className="text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Bible X
                </Link>
              </div>
            </div>
          </div>


          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#posts"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Posts
            </Link>
            <Link
              href="#biblex"
              className="text-primary-foreground hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Bible X
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
