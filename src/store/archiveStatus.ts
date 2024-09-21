import { create } from 'zustand';

type ArchiveStatus = 'PENDING' | 'COMPLETE' | 'FAIL';

interface ArchiveStatusState {
  status: ArchiveStatus;
  setStatus: (status: ArchiveStatus) => void;
}

export const useArchiveStatusStore = create<ArchiveStatusState>((set) => ({
  status: 'PENDING',
  setStatus: (status) => set({ status }),
}));
