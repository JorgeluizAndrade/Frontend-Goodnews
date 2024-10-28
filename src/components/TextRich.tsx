"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph"; // Import Paragraph extension
import { FaBold } from "react-icons/fa";
import { FaItalic, FaList } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle";
import Blockquote from "@tiptap/extension-blockquote";
import Youtube from "@tiptap/extension-youtube";
import { Separator } from "@/components/ui/separator";
import { LuHeading2 } from "react-icons/lu";
import { LuTextQuote } from "react-icons/lu";
import Heading from "@tiptap/extension-heading";
import Image from '@tiptap/extension-image';
import { FaYoutube } from "react-icons/fa6";
import React from "react";
import { FaImage } from "react-icons/fa";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [height, setHeight] = React.useState<number>(480);
  const [width, setWidth] = React.useState<number>(640);

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
            class: "list-disc pl-4 list-outside",
          },
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-custom-class my-4 text-base text-gray-800 leading-6', // Estilos personalizados usando Tailwind
        },
      }),
   // Add Paragraph to extensions array
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class:
            "text-2xl italic md:not-italic underline decoration-sky-600 hover:decoration-blue-400",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-sky-700 pl-4 italic text-black bg-gray-50",
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
        progressBarColor: "blue",
        HTMLAttributes: {
          class: "rounded-lg",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      })
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
  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      if (!editor) {
        return null;
      }
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt("width", 10)) || 500,
        height: Math.max(180, parseInt("height", 10)) || 300,
      });
    }
  };

  const setParagraph = () => {
    editor.commands.setParagraph();
  };

  const addImage = React.useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        className={editor.isActive("bold") ? "text-red-600 " : "text-black"}
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
        className={
          editor.isActive("bulletList") ? "text-red-600" : "text-black"
        }
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaList className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        className={
          editor.isActive("blockquote") ? "text-red-600" : "text-black"
        }
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <LuTextQuote className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={editor.isActive("youtube") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("youtube")}
        onClick={addYoutubeVideo}
      >
        <FaYoutube className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={editor.isActive("image") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("image")}
        onClick={addImage}
      >
        <FaImage className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        className={editor.isActive("paragraph") ? "text-red-600" : "text-black"}
        pressed={editor.isActive("paragraph")}
        onClick={setParagraph} // Chama setParagraph ao clicar
      >
        <span>Paragraph</span> {/* Você pode substituir por um ícone se desejar */}
      </Toggle>

    </div>
  );
};

export default RichTextEditor;
