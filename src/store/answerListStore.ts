import { create } from 'zustand';

import { AnswerListPage } from '@/entities/types/interview';

export interface answerListStore {
  answerListData: AnswerListPage | null;
  setAnswersData: (data: AnswerListPage) => void;
}

export const useAnswerListStore = create<answerListStore>((set) => ({
  answerListData: null,
  setAnswersData: (data) => set({ answerListData: data }),
}));
