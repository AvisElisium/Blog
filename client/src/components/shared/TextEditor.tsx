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

    const [images, setImages] = useState<ImageUploadResult[]>([]);
    const [imagesForDelete, setImagesForDelete] = useState<ImageUploadResult[]>([]);

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
                setImagesForDelete((prevImagesForDelete) => [...prevImagesForDelete, image]);

                setImages((prevImages) => prevImages.filter((_image) => _image.id !== image.id))
            }
        })
    }, [description])
    
    const handleSetImages = (img: ImageUploadResult) => {
        setImages((prevImages) => [...prevImages, img]);
    }
    
    const {mutateAsync} = useMutation((image: ImageUploadResult) => axios.delete(`/image/${image.id}`));
    
    useEffect(() => {
        imagesForDelete.forEach(async (image) => {
            await mutateAsync(image);
        })
    }, [imagesForDelete])

    if (!editor) return null
    editorRef.current = editor

    return (
        <div className={"editorContainer"}>
            <TextEditorToolBar editor={editor as Editor} description={description} handleSetImages={handleSetImages} />
            <EditorContent editor={editor} />
        </div>
    )
})

export default TextEditor;