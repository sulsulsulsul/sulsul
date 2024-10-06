import { create } from 'zustand';

interface AnswerModalState {
  isOpenAnswerModal: boolean;
  isOpenCancelModal: boolean;
  isOpenDeleteModal: boolean;
  isOpenReportModal: boolean;
  isOpenAllAnswerModal: boolean;
  isEditModal: boolean;
  isTogetherSection: boolean;
  isBestAnswerSection: boolean;
  setOpenAnswerModal: (isOpen: boolean) => void;
  setOpenCancelModal: (isOpen: boolean) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenReportModal: (isOpen: boolean) => void;
  setIsOpenAllAnswerModal: (isOpen: boolean) => void;
  setIsEditModal: (isEditModal: boolean) => void;
  setIsTogetherSection: (isTogetherSection: boolean) => void;
  setIsBestAnswerSection: (isBestAnswerSection: boolean) => void;
}

export const useAnswerModalStore = create<AnswerModalState>((set) => ({
  isOpenAnswerModal: false,
  isOpenCancelModal: false,
  isOpenDeleteModal: false,
  isOpenReportModal: false,
  isOpenAllAnswerModal: false,
  isEditModal: false,
  isTogetherSection: false,
  isBestAnswerSection: false,
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
  setOpenReportModal: (isOpen: boolean) =>
    set(() => ({
      isOpenReportModal: isOpen,
    })),
  setIsOpenAllAnswerModal: (isOpen: boolean) =>
    set(() => ({
      isOpenAllAnswerModal: isOpen,
    })),

  setIsEditModal: (isOpen: boolean) =>
    set(() => ({
      isEditModal: isOpen,
    })),

  setIsTogetherSection: (isOpen: boolean) =>
    set(() => ({
      isTogetherSection: isOpen,
    })),
  setIsBestAnswerSection: (isOpen: boolean) =>
    set(() => ({
      isBestAnswerSection: isOpen,
    })),
}));
