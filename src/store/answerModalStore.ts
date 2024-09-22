import { create } from 'zustand';

interface AnswerModalState {
  isOpenAnswerModal: boolean;
  isOpenCancelModal: boolean;
  setOpenAnswerModal: () => void;
  setOpenCancelModal: () => void;
}

export const useAnswerModalStore = create<AnswerModalState>((set) => ({
  isOpenAnswerModal: false,
  isOpenCancelModal: false,
  setOpenAnswerModal: () =>
    set((state) => ({
      isOpenAnswerModal: !state.isOpenAnswerModal,
    })),
  setOpenCancelModal: () =>
    set((state) => ({
      isOpenCancelModal: !state.isOpenCancelModal,
    })),
}));
