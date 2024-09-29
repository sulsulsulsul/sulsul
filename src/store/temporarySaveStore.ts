import { create } from 'zustand';

interface SaveStore {
  isTemporarySaved: boolean;
  setIsTemporarySaved: (status: boolean) => void;
}
export const useTemporarySaveStore = create<SaveStore>((set) => ({
  isTemporarySaved: false,
  setIsTemporarySaved: (status: boolean) => set({ isTemporarySaved: status }),
}));
