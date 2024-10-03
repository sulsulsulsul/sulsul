import { create } from 'zustand';

import { InterviewData } from '@/entities/types/interview';

export interface InterviewState {
  currentData: InterviewData;
  previousData: InterviewData;
  setInterviewData: (newData: InterviewData) => void;
  setPreviousInterviewData: (newData: InterviewData) => void;
}

const defaultInterviewData: InterviewData = {
  weeklyInterviewId: 0,
  weeklyInterviewImage: '',
  content: '',
  year: 0,
  week: 0,
  startDateTime: '',
  endTime: '',
  answerCount: 0,
  profileImgs: [],
};
export const useInterviewStore = create<InterviewState>((set) => ({
  currentData: defaultInterviewData,
  previousData: defaultInterviewData,
  setInterviewData: (data) => set({ currentData: data }),
  setPreviousInterviewData: (data) => set({ previousData: data }),
}));
