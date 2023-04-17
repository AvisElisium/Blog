import {Editor, EditorContent, PureEditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolBar, {ImageUploadResult} from "./TextEditorToolBar";
import {
    FC,
    ForwardedRef,
    forwardRef,
    MutableRefObject,
    SyntheticEvent,
    useEffect,
    useImperativeHandle,
    useRef, useState
} from "react";
import Image from "@tiptap/extension-image";
import {useMutation} from "react-query";
import axios from "axios";
import textEditorStore from "../../stores/textEditorStore";
import useTextEditorStore from "../../stores/textEditorStore";

export interface TipTapMethods {
    clearContent: () => void;
}

interface Props {
    description: string;
    onChange: (e: any) => void;
    id: string;
}

const TextEditor: FC<Props> = forwardRef(({ description, onChange }, ref: ForwardedRef<TipTapMethods>) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: "article-image"
                }
            })
        ],
        content: description,
        onUpdate({editor}) {
            onChange(editor.getHTML())
        },
    })

    const images = useTextEditorStore((state) => state.images);
    const deleteImage = useTextEditorStore((state) => state.deleteImage);
    
    const editorRef: MutableRefObject<Editor | null> = useRef(null)
    
    useImperativeHandle(ref, () => ({
        clearContent: () => {
            editorRef.current?.commands.clearContent();
        }
    }))

    useEffect(() => {
        images.forEach((image) => {

            console.log(!description.includes(`title="${image.id}"`));

            if (!description.includes(`title="${image.id}"`)) {
                deleteImage(image);
            }
        })
    }, [description])
    
    if (!editor) return null
    editorRef.current = editor

    return (
        <div className={"editorContainer"}>
            <TextEditorToolBar editor={editor as Editor} description={description} />
            <EditorContent editor={editor} />
        </div>
    )
})

export default TextEditor;