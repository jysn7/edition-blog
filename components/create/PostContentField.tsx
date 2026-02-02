"use client";

import { useState } from "react";
import Editor from "./TextEditor";


export default function PostContentField() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Narrative Content
        </label>
        <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
          Portable Text Mode
        </span>
      </div>

      <div className="relative min-h-[400px]">
        <Editor onChange={(jsonString) => setContent(jsonString)} />
        <input 
          type="hidden" 
          name="content" 
          value={content} 
          required 
        />

        <div className="absolute bottom-4 right-6 pointer-events-none z-10">
          <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">
            Rich Text & Media Enabled
          </span>
        </div>
      </div>
      
      <p className="px-1 text-[9px] text-muted-foreground/50 italic leading-none">
        Tip: Type <kbd className="font-sans border border-border px-1 rounded"> / </kbd> for headers, lists, and image uploads.
      </p>
    </div>
  );
}