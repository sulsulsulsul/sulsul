import { create } from 'zustand';

import { AnswerListData } from '@/entities/types/interview';

interface MyAnswerStore {
  myAnswerData: AnswerListData | null;
  setMyAnswerData: (data: AnswerListData) => void;
}

export const useMyAnswerStore = create<MyAnswerStore>((set) => ({
  myAnswerData: null,
  setMyAnswerData: (data: AnswerListData) => set({ myAnswerData: data }),
}));
