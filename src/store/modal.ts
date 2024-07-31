import { boolean } from 'zod'
import { create } from 'zustand'

interface ModalState {
  videoPlaying: boolean
  pause: () => void
  restart: () => void
}

export const useVideoStateStore = create<ModalState>((set) => ({
  videoPlaying: true,
  pause: () => {
    set((state) => ({
      videoPlaying: false,
    }))
  },
  restart: () => {
    set((state) => ({
      videoPlaying: true,
    }))
  },
}))
