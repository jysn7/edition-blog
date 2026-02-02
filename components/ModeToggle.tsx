"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-lg border-border h-9 w-9 bg-transparent hover:bg-secondary/50 transition-colors"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-2xl z-[60] min-w-[120px] p-1.5"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 px-3 cursor-pointer rounded-md focus:bg-secondary transition-all"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5" />
            Light
          </div>
          {theme === "light" && <Check className="h-3 w-3" />}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 px-3 cursor-pointer rounded-md focus:bg-secondary transition-all"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-3.5 w-3.5" />
            Dark
          </div>
          {theme === "dark" && <Check className="h-3 w-3" />}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] py-2.5 px-3 cursor-pointer rounded-md focus:bg-secondary transition-all"
        >
          <div className="flex items-center gap-2">
            <Monitor className="h-3.5 w-3.5" />
            System
          </div>
          {theme === "system" && <Check className="h-3 w-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}