import { create } from 'zustand';

interface InterviewData {
  weeklyInterviewId: number;
  content: string;
  year: number;
  week: number;
  startDateTime: string;
  endTime: string;
  answerCount: number;
  profileImgs: string[];
}

export interface InterviewState {
  currentData: InterviewData | null;
  previousData: InterviewData | null;
  setInterviewData: (newData: InterviewData) => void;
  setPreviousInterviewData: (newData: InterviewData) => void;
}
export const useInterviewStore = create<InterviewState>((set) => ({
  currentData: null,
  previousData: null,
  setInterviewData: (data) => set({ currentData: data }),
  setPreviousInterviewData: (data) => set({ previousData: data }),
}));
