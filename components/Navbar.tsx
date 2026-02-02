"use client";

import React from "react";
import { Menu, Globe, Plus, ArrowUpRight } from "lucide-react"; 
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
import { 
  SignInButton, 
  UserButton, 
  SignedIn, 
  SignedOut 
} from "@clerk/nextjs";

export const Navbar = () => {
  const navItems = ["Writers"];

  return (
    <nav className="border-b border-border/40 px-6 h-16 flex justify-between items-center sticky top-0 bg-background/60 backdrop-blur-md z-50">
      
      {/* Logo */}
      <Link href="/" className="group">
        <h1 className="text-xl font-black uppercase tracking-tighter cursor-pointer flex items-center gap-0.5">
          Edition
          <span className="text-primary transition-transform group-hover:rotate-12 inline-block">.</span>
        </h1>
      </Link>

      {/* Navigation & Actions Container */}
      <div className="flex items-center gap-8">
        
        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative py-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-3">
          
          <div className="hidden md:flex items-center gap-3">
            <SignedIn>
              <Link href="/new">
                <Button
                  variant="default"
                  className="rounded-full cursor-pointer h-8 px-4 text-[9px] uppercase font-bold tracking-[0.15em] flex items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <Plus className="h-3 w-3 stroke-3" />
                  New Post
                </Button>
              </Link>
              
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background hover:ring-primary transition-all",
                    userButtonTrigger: "focus:shadow-none focus:outline-none"
                  }
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="rounded-full border-2 cursor-pointer border-border/70  h-8 px-4 text-[9px] uppercase font-black tracking-[0.15em] hover:bg-secondary/50"
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <div className="h-4 w-px bg-border/60 mx-1" />
            <ModeToggle />
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[350px] bg-background border-l border-border/40 p-0 flex flex-col"
            >
              <SheetHeader className="p-8 border-b border-border/40 text-left">
                <SheetTitle className="text-2xl font-black uppercase tracking-tighter italic">
                  Edition<span className="text-primary">.</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col flex-1">
                {/* Navigation Links */}
                <nav className="p-8 flex flex-col gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Quick Nav
                  </p>
                  {navItems.map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="text-4xl font-black uppercase tracking-tighter hover:italic hover:pl-2 transition-all flex items-center justify-between group"
                    >
                      {item}
                      <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-auto p-8 border-t border-border/40 space-y-6 bg-secondary/10">
                  <SignedIn>
                    <Link href="/new" className="block w-full">
                      <Button className="w-full rounded-lg h-12 text-xs uppercase font-black tracking-widest active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        Create New Entry
                      </Button>
                    </Link>
                    <div className="flex items-center justify-between py-2 border-b border-border/40">
                      <span className="text-[10px] font-bold uppercase tracking-widest">User Profile</span>
                      <UserButton />
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full rounded-lg h-12 text-xs uppercase font-black tracking-widest">
                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Toggle Theme</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};