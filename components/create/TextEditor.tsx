"use client";

import { 
  BlockNoteSchema, 
  defaultBlockSpecs 
} from "@blocknote/core";
import { 
  useCreateBlockNote,
  SuggestionMenuController, 
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

// Styles
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    paragraph: defaultBlockSpecs.paragraph,
    heading: defaultBlockSpecs.heading,
    bulletListItem: defaultBlockSpecs.bulletListItem,
    numberedListItem: defaultBlockSpecs.numberedListItem,
    image: defaultBlockSpecs.image,
  },
});

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent }: EditorProps) {
  // initialize the editor with schema
  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div className="bn-container">
      <BlockNoteView
        editor={editor}
        theme="dark"
        data-theming-css
        slashMenu={false} 
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        className="bg-transparent"
      >
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => {
            const allItems = getDefaultReactSlashMenuItems(editor);
            
            return allItems
              .filter((item) =>
                // Only allow these specific blocks
                ["Heading 1", "Heading 2", "Heading 3", "Paragraph", "Bullet List", "Numbered List", "Image"].includes(item.title)
              )
              .filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              );
          }}
        />
      </BlockNoteView>
    </div>
  );
};