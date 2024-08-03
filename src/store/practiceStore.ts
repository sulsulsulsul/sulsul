import { set } from 'zod'
import { create } from 'zustand'

import { ArchiveQuestionItem } from '@/entities/types'

interface PracticeSelectionList {
  random: boolean
  timer: boolean
  practiceList: ArchiveQuestionItem[]
}
interface PracticeSetStore extends PracticeSelectionList {
  setStore: ({ random, timer, practiceList }: PracticeSelectionList) => void
}

export const usePracticeStore = create<PracticeSetStore>((set) => ({
  random: false,
  timer: false,
  practiceList: [],
  setStore: ({ random, timer, practiceList }) =>
    set(() => ({
      random: random,
      timer: timer,
      practiceList: practiceList,
    })),
  // clearStore: () =>
  //   set(() => ({
  //     random: false,
  //     timer: false,
  //     practiceList: [],
  //   })),
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
