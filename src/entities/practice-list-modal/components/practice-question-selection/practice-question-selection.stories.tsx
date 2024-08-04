import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import QuestionSelection from '.'

const meta = {
  component: QuestionSelection,
} satisfies Meta<typeof QuestionSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    resetQuestion: false,
    questionId: 1,
    selectAll: false,
    questionProp: {
      isHint: false,
      questionId: 1,
      content:
        'SK SUNNY 사회변화 챌린지 프로젝트에 참여하신 동기는 무엇이었나요?',
      isAnswered: false,
      answer: '답답답답답답답답답답답답',
      keywords: [],
    },
    setFinalQuestions: () => {},
  },
} satisfies Story
