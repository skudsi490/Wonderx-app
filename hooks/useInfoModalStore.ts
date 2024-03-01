import { create } from "zustand";

export interface ModalStoreInterface {
  courseId?: string;
  isOpen: boolean;
  openModal: (courseId: string) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  courseId: undefined,
  isOpen: false,
  openModal: (courseId: string) => {
    set({ isOpen: true, courseId });
  },
  closeModal: () => set({ isOpen: false, courseId: undefined }),
}));

export default useInfoModalStore;
