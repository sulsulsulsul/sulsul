import { create } from 'zustand'

interface isQuestionCreated {
  isQuestionCreated: boolean
  setIsQuestionCreated: (state: boolean) => void
}

export const useCreateQuestionStore = create<isQuestionCreated>((set) => ({
  isQuestionCreated: false,
  setIsQuestionCreated: (state) =>
    set({
      isQuestionCreated: state,
    }),
}))
