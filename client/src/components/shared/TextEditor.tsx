import {Editor, EditorContent, PureEditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolBar from "./TextEditorToolBar";
import {ForwardedRef, forwardRef, MutableRefObject, SyntheticEvent, useImperativeHandle, useRef} from "react";

export interface TipTapMethods {
    clearContent: () => void;
}

const TextEditor = forwardRef((props: {description: string, onChange: (e: any) => void}, ref: ForwardedRef<TipTapMethods>) => {
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
        ],
        content: props.description,
        onUpdate({editor}) {
            props.onChange(editor.getHTML())
        },
    })

    const editorRef: MutableRefObject<Editor | null> = useRef(null)
    
    useImperativeHandle(ref, () => ({
        clearContent: () => {
            editorRef.current?.commands.clearContent();
        }
    }))

    if (!editor) return null
    editorRef.current = editor

    return (
        <div className={"editorContainer"}>
            <TextEditorToolBar editor={editor as Editor} />
            <EditorContent editor={editor} />
        </div>
    )
})

export default TextEditor;