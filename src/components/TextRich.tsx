"use client";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold } from "react-icons/fa";
import { FaItalic, FaList } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { LuHeading2 } from "react-icons/lu";
import Heading from "@tiptap/extension-heading";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: value, 
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); 
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        className={editor.isActive("bold") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <FaBold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        className={editor.isActive("italic") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        className={editor.isActive("heading") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <LuHeading2 className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        className={editor.isActive("bulletList") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaList className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
