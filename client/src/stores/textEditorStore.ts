import { ImageUploadResult } from '../components/shared/TextEditorToolBar';
import { create, createStore } from 'zustand';

interface TextEditorState {
  images: ImageUploadResult[];
  imagesForDelete: ImageUploadResult[];

  addImage: (img: ImageUploadResult) => void;
  deleteImage: (img: ImageUploadResult) => void;
}

const useTextEditorStore = create<TextEditorState>((set) => ({
  images: [],
  imagesForDelete: [],

  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
      imagesForDelete: state.imagesForDelete.filter((img) => img.id !== image.id)
    })),

  deleteImage: (image) =>
    set((state) => ({
      imagesForDelete: [...state.imagesForDelete, image],
      images: state.images.filter((img) => img.id !== image.id)
    }))
}));

export default useTextEditorStore;
