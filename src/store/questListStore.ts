import create from 'zustand';

import { MyQuestionList } from '@/entities/types/challenges';

interface QuestionStore {
  questions: MyQuestionList;
  setQuestions: (questions: MyQuestionList) => void;
}

export const useQuestionListStore = create<QuestionStore>((set) => ({
  questions: {
    answerRate: 0,
    challenges: [
      {
        challengeId: 0,
        content: '',
        isAnswered: false,
        question: {
          questionId: 0,
          answer: '',
          keywords: [
            {
              keywordId: 0,
              content: '',
            },
          ],
          feedback: '',
        },
      },
    ],
  },
  setQuestions: (questions) => set({ questions }),
}));
