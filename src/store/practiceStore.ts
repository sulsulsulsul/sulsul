import { set } from 'zod'
import { create } from 'zustand'

import { ArchiveQuestionItem } from '@/entities/types'

interface PracticeSelectionList {
  timer: boolean
  practiceList: ArchiveQuestionItem[]
}
interface PracticeSetStore extends PracticeSelectionList {
  setStore: ({ timer, practiceList }: PracticeSelectionList) => void
}

export const usePracticeStore = create<PracticeSetStore>((set) => ({
  timer: false,
  practiceList: [],
  setStore: ({ timer, practiceList }) =>
    set(() => ({
      timer: timer,
      practiceList: practiceList,
    })),
}))

interface PracticeResult {
  time: string
  correct: ArchiveQuestionItem[]
  incorrect: ArchiveQuestionItem[]
  setResult?: ({ time, correct, incorrect }: PracticeResult) => void
}

export const usePracticeResultStore = create<PracticeResult>((set) => ({
  time: '00 : 00',
  correct: [],
  incorrect: [],
  setResult: ({ time, correct, incorrect }) =>
    set(() => ({
      time: time,
      correct: correct,
      incorrect: incorrect,
    })),
}))
