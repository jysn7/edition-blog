"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Added h-9 w-9 to match your Navbar button height */}
        <Button variant="outline" size="icon" className="rounded-lg border-border h-9 w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* 1. Added bg-background (or bg-popover) to fix transparency.
          2. Added min-w-[8rem] and border-border for the editorial look.
      */}
      <DropdownMenuContent 
        align="end" 
        className="bg-background border border-border rounded-lg shadow-xl z-[60]"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="text-xs font-regular py-3 tracking-widest cursor-pointer focus:bg-secondary"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="text-xs font-regular py-3 tracking-widest cursor-pointer focus:bg-secondary"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="text-xs font-regular py-3 tracking-widest cursor-pointer focus:bg-secondary"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}