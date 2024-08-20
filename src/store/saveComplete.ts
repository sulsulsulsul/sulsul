import { create } from 'zustand';

interface SaveComplete {
  saveComplete: boolean;
  setSaveComplete: (state: boolean) => void;
}

export const useSaveCompleteStore = create<SaveComplete>((set) => ({
  saveComplete: false,
  setSaveComplete: (state) =>
    set({
      saveComplete: state,
    }),
}));
