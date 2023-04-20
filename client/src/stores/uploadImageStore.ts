import { create } from 'zustand';

interface UploadImageState {
  uploadedImage: Blob | null;
  cropper: Cropper | undefined;

  setImage: (image: Blob | null) => void;

  setCropper: (cropper: Cropper) => void;
}

const useUploadImageStore = create<UploadImageState>((set) => ({
  uploadedImage: null,

  cropper: undefined,

  setImage: (image: Blob | null) =>
    set({
      uploadedImage: image
    }),

  setCropper: (cropper) =>
    set({
      cropper
    })
}));

export default useUploadImageStore;
