import { create } from 'zustand'

interface CurrentArchiveId {
  currentId: number
  setCurrentId: (id: number) => void
}

export const useCurrentArchiveIdStore = create<CurrentArchiveId>((set) => ({
  currentId: 0,
  setCurrentId: (state) =>
    set({
      currentId: state,
    }),
}))
