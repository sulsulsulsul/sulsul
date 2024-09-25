import { create } from 'zustand';

interface AnswerModalState {
  isOpenAnswerModal: boolean;
  isOpenCancelModal: boolean;
  isOpenDeleteModal: boolean;
  setOpenAnswerModal: (isOpen: boolean) => void;
  setOpenCancelModal: (isOpen: boolean) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
}

export const useAnswerModalStore = create<AnswerModalState>((set) => ({
  isOpenAnswerModal: false,
  isOpenCancelModal: false,
  isOpenDeleteModal: false,
  setOpenAnswerModal: (isOpen: boolean) =>
    set(() => ({
      isOpenAnswerModal: isOpen,
    })),
  setOpenCancelModal: (isOpen: boolean) =>
    set(() => ({
      isOpenCancelModal: isOpen,
    })),
  setOpenDeleteModal: (isOpen: boolean) =>
    set(() => ({
      isOpenDeleteModal: isOpen,
    })),
}));
