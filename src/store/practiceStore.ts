import { create } from 'zustand'

import { ArchiveQuestionItem } from '@/entities/types'

interface StoredItems {
  random: boolean
  timer: boolean
  practiceList: ArchiveQuestionItem[]
}

interface PracticeStore extends StoredItems {
  setStore: ({ random, timer, practiceList }: StoredItems) => void
  // clearStore: () => void
}

export const usePracticeStore = create<PracticeStore>((set) => ({
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
