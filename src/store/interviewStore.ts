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
  currentData: InterviewData;
  previousData: InterviewData;
  setInterviewData: (newData: InterviewData) => void;
  setPreviousInterviewData: (newData: InterviewData) => void;
}

const defaultInterviewData: InterviewData = {
  weeklyInterviewId: 0,
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
