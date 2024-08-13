import { create } from 'zustand';

interface isEditingQuestion {
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
}

export const useEditQuestionStore = create<isEditingQuestion>((set) => ({
  isEditing: false,
  setIsEditing: (state) =>
    set({
      isEditing: state,
    }),
}));
