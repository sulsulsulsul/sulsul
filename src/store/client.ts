import { create } from 'zustand'

interface PendingState {
  isPending: boolean
  setIsPending: (pending: boolean) => void
}

export const usePendingStore = create<PendingState>((set) => ({
  isPending: false,
  setIsPending: (pending) => set({ isPending: pending }),
}))
