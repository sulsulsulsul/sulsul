import { set } from 'zod';
import { create } from 'zustand';

import { ArchiveQuestionItem } from '@/entities/types';

interface PracticeSelectionList {
  timer: boolean;
  practiceList: ArchiveQuestionItem[];
  practiceId: number;
}
interface PracticeSetStore extends PracticeSelectionList {
  setStore: ({
    timer,
    practiceList,
    practiceId,
  }: PracticeSelectionList) => void;
}

export const usePracticeStore = create<PracticeSetStore>((set) => ({
  timer: false,
  practiceList: [],
  practiceId: 0,
  setStore: ({ timer, practiceList, practiceId }) =>
    set(() => ({
      timer: timer,
      practiceList: practiceList,
      practiceId: practiceId,
    })),
}));

interface PracticeResult {
  time: number;
  correct: ArchiveQuestionItem[];
  incorrect: ArchiveQuestionItem[];
  setResult?: ({ time, correct, incorrect }: PracticeResult) => void;
}

export const usePracticeResultStore = create<PracticeResult>((set) => ({
  time: 0,
  correct: [],
  incorrect: [],
  setResult: ({ time, correct, incorrect }) =>
    set(() => ({
      time: time,
      correct: correct,
      incorrect: incorrect,
    })),
}));
