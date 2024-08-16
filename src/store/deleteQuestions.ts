import { create } from 'zustand';

export interface deleteQuestionType {
  deleteQuestions: number[];
  setDeleteQuestions: (
    questions: number[] | ((prev: number[]) => number[]),
  ) => void;
}

export const useDeleteQuestionStore = create<deleteQuestionType>((set) => ({
  deleteQuestions: [],
  setDeleteQuestions: (update) =>
    set((state) => ({
      deleteQuestions:
        typeof update === 'function' ? update(state.deleteQuestions) : update,
    })),
}));
