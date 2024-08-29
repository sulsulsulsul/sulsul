import { set } from 'zod';
import { create } from 'zustand';

import { PracticingListType } from '@/entities/types/question';

interface PracticeSelectionList {
  timer: boolean;
  practiceList: PracticingListType[];
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
  correct: PracticingListType[];
  incorrect: PracticingListType[];
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

interface FocusedQuestion {
  focused: number;
  setQuestionId: (questionId: number) => void;
}

export const useFocusedQuestionCard = create<FocusedQuestion>((set) => ({
  focused: 0,
  setQuestionId: (questionId: number) =>
    set(() => ({
      focused: questionId,
    })),
}));
