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
  data: InterviewData | null;
  setInterviewData: (newData: InterviewData) => void;
}
export const useInterviewStore = create<InterviewState>((set) => ({
  data: null,
  setInterviewData: (newData) => set({ data: newData }),
}));
