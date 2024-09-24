import { create } from 'zustand';

interface AnswerModalState {
  isOpenAnswerModal: boolean;
  isOpenCancelModal: boolean;
  setOpenAnswerModal: (isOpen: boolean) => void;
  setOpenCancelModal: (isOpen: boolean) => void;
}

export const useAnswerModalStore = create<AnswerModalState>((set) => ({
  isOpenAnswerModal: false,
  isOpenCancelModal: false,
  setOpenAnswerModal: (isOpen: boolean) =>
    set(() => ({
      isOpenAnswerModal: isOpen,
    })),
  setOpenCancelModal: (isOpen: boolean) =>
    set(() => ({
      isOpenCancelModal: isOpen,
    })),
}));
