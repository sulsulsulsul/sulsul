import { boolean } from 'zod';
import { create } from 'zustand';

interface ModalState {
  videoPlaying: boolean;
  pause: () => void;
  restart: () => void;
}

export const useVideoStateStore = create<ModalState>((set) => ({
  videoPlaying: true,
  pause: () => {
    set((state) => ({
      videoPlaying: false,
    }));
  },
  restart: () => {
    set((state) => ({
      videoPlaying: true,
    }));
  },
}));

interface SelectionState {
  resumeId: number;
  preSelectQuestionId: number;
  setResumeId: (data: number) => void;
  setPreSelectQuestionId: (data: number) => void;
}

export const useSelectedQuestionStore = create<SelectionState>((set) => ({
  resumeId: 0,
  preSelectQuestionId: 0,
  setResumeId: (data: number) => set({ resumeId: data }),
  setPreSelectQuestionId: (data: number) => set({ preSelectQuestionId: data }),
}));

interface OpenModalState {
  openModal: boolean;
  selectedTab: 'all' | 'good' | 'bad';
  setSelectedTab: (state: 'good' | 'bad') => void;
  setModalOpen: (state: boolean) => void;
}

export const useOpenModalStore = create<OpenModalState>((set) => ({
  openModal: false,
  selectedTab: 'all',
  setSelectedTab: (state) => set({ selectedTab: state }),
  setModalOpen: (state) => set({ openModal: state }),
}));
