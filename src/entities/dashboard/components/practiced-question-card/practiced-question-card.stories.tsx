import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { PracticedQuestionCard } from './'

const meta = {
  component: PracticedQuestionCard,
} satisfies Meta<typeof PracticedQuestionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    question: 'MVP 테스트를 진행하는 과정에서 어려웠던 점은 무엇이었나요?',
    title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
    company: '기업명',
    handleRetry: fn(),
  },
} satisfies Story
