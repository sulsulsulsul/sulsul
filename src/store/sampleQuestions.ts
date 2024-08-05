import { create } from 'zustand'

interface SampleState {
  isSampleClicked: boolean
  isSampleWritten: boolean
  setIsSampleClicked: () => void
  setIsSampleWritten: () => void
}

export const useSampleStore = create<SampleState>((set) => ({
  isSampleClicked: false,
  isSampleWritten: false,
  setIsSampleClicked: () => set({ isSampleClicked: true }),
  setIsSampleWritten: () => set({ isSampleWritten: true }),
}))
