"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PenLine, Tag } from "lucide-react";
import { useState } from "react";

interface Category {
  _id: string;
  title: string;
  slug: string;
  color?: string;
}

export default function PostMetaFields({ categories }: { categories: Category[] }) {
  const [category, setCategory] = useState("");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Headline */}
        <div className="space-y-3 group w-full">
          <div className="flex items-center gap-2 px-1">
            <PenLine className="h-3 w-3 text-muted-foreground" />
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Headline
            </label>
          </div>

          <Input
            name="title"
            placeholder="Title of your story..."
            required
            className="w-full bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-foreground rounded-lg h-14 text-base font-medium tracking-tight px-6"
          />
        </div>

        {/* Category */}
        <div className="space-y-3 group w-full">
          <div className="flex items-center gap-2 px-1">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Category
            </label>
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-secondary/30 border-none rounded-lg py-7 px-6 text-base font-medium tracking-tight flex items-center">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent className="bg-background border border-border shadow-md rounded-xl p-2">
              {categories?.map((cat) => (
                <SelectItem
                  key={cat._id}
                  value={cat._id}
                  className="px-6 py-3 text-base font-regular cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {cat.color && (
                      <div 
                        className="h-2 w-2 rounded-full" 
                        style={{ backgroundColor: cat.color }} 
                      />
                    )}
                    {cat.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input type="hidden" name="category" value={category} required />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-3 w-full">
        <label className="px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Brief Summary
        </label>

        <Textarea
          name="excerpt"
          placeholder="A short summary..."
          rows={2}
          className="w-full bg-secondary/30 border-none rounded-lg p-6 text-sm font-medium tracking-tight resize-none"
        />
      </div>
    </div>
  );
}