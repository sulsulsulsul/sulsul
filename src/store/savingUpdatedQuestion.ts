import { create } from 'zustand';

interface isSaving {
  isSaving: boolean;
  setIsSaving: (state: boolean) => void;
}

export const useSaveUpdatedQuestionStore = create<isSaving>((set) => ({
  isSaving: false,
  setIsSaving: (state) =>
    set({
      isSaving: state,
    }),
}));
