"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    Link as LinkIcon
} from "lucide-react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt("請輸入圖片 URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("請輸入連結 URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg sticky top-0 z-10">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="加粗"
            >
                <Bold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="斜體"
            >
                <Italic size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="底線"
            >
                <UnderlineIcon size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="標題 1"
            >
                <Heading1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="標題 2"
            >
                <Heading2 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="無序列表"
            >
                <List size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="有序列表"
            >
                <ListOrdered size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("blockquote") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="引用"
            >
                <Quote size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="靠左對齊"
            >
                <AlignLeft size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="置中對齊"
            >
                <AlignCenter size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="靠右對齊"
            >
                <AlignRight size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={setLink}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-200 text-primary" : "text-gray-600"}`}
                title="插入連結"
            >
                <LinkIcon size={18} />
            </button>
            <button
                type="button"
                onClick={addImage}
                className="p-2 rounded hover:bg-gray-200 text-gray-600"
                title="插入圖片"
            >
                <ImageIcon size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30"
                title="復原"
            >
                <Undo size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-30"
                title="重做"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full rounded-lg shadow-md my-4",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: "在這裡輸入文章內容...",
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-4",
            },
        },
    });

    return (
        <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap {
                    outline: none !important;
                }
                .tiptap ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                }
                .tiptap ol {
                    list-style-type: decimal !important;
                    padding-left: 1.5rem !important;
                }
            `}</style>
        </div>
    );
}
