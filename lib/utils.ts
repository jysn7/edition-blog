import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function blockNoteToPortableText(blocks: any[]) {
  return blocks.map((block) => {
    let style = "normal";
    if (block.type === "heading") {
      style = `h${block.props.level || 1}`;
    }

    // Map list items
    const listItem = block.type === "bulletListItem" ? "bullet" : 
                     block.type === "numberedListItem" ? "number" : undefined;

    return {
      _key: block.id,
      _type: "block",
      style: listItem ? "normal" : style,
      listItem: listItem,
      // Convert BlockNote content to Sanity spans
      children: block.content.map((c: any) => ({
        _key: Math.random().toString(36).substring(7),
        _type: "span",
        text: c.text,
        marks: [
          c.styles?.bold && "strong",
          c.styles?.italic && "em",
          c.styles?.underline && "underline",
          c.styles?.strike && "strike-through"
        ].filter(Boolean),
      })),
      markDefs: [],
    };
  });
}