import { create } from 'zustand';

interface isResetAvailable {
  isResetAvailable: boolean;
  setIsResetAvailable: (state: boolean) => void;
}

export const useResetAvailableStore = create<isResetAvailable>((set) => ({
  isResetAvailable: true,
  setIsResetAvailable: (state) =>
    set({
      isResetAvailable: state,
    }),
}));
