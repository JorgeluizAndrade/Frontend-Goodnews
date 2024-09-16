import { FaBold } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { FaItalic, FaList, FaQuoteLeft } from "react-icons/fa";
import { Editor } from "@tiptap/react";

const TipTapMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-red-500 rounded-full" : ""}
      >
        <FaBold className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-red-500 rounded-full" : ""}
      >
        <FaItalic className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-red-500 rounded-full"
            : ""
        }
      >
        <LuHeading1 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-red-500 rounded-full"
            : ""
        }
      >
        <LuHeading2 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-red-500 rounded-full"
            : ""
        }
      >
        <LuHeading3 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-red-500 rounded-full" : ""
        }
      >
        <FaList className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote") ? "bg-red-500 rounded-full" : ""
        }
      >
        <FaQuoteLeft className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TipTapMenu;
