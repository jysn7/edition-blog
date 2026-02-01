"use client";

import React from "react";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export const Navbar = () => {
  const navItems = ["Writers"];

  return (
    <nav className="border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-50">
      
      {/* Logo */}
      <Link href="/">
        <h1 className="text-xl font-black uppercase tracking-tighter cursor-pointer">
          Edition<span className="text-muted-foreground">.</span>
        </h1>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-muted-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop login */}
        <Button
          variant="outline"
          className="hidden md:flex rounded-lg border-border h-9 px-4 text-[10px] uppercase font-bold tracking-widest hover:bg-secondary"
        >
          Login
        </Button>

        {/* Desktop theme toggle */}
        <div className="hidden md:block">
          <ModeToggle />
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-5 w-5 md:hidden cursor-pointer hover:text-muted-foreground transition-colors" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] bg-background border-r border-border p-0 flex flex-col"
          >
            {/* Header */}
            <SheetHeader className="p-6 border-b border-border">
              <SheetTitle className="text-xl font-black uppercase tracking-tighter">
                Edition<span className="text-muted-foreground">.</span>
              </SheetTitle>
            </SheetHeader>

            {/* Content */}
            <div className="flex flex-col flex-1">
              
              {/* Navigation */}
              <div className="px-6 py-10 flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Navigation
                </span>

                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-2xl font-black uppercase tracking-tight hover:text-muted-foreground transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="px-6 py-6 border-t border-border space-y-5">
                <Button
                  variant="outline"
                  className="w-full rounded-lg h-10 text-[10px] uppercase font-bold tracking-widest hover:bg-secondary"
                >
                  Login
                </Button>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Appearance
                  </span>
                  <ModeToggle />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto px-6 py-6 border-t border-border flex items-center justify-between">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Global Archive ©2026
                </span>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
