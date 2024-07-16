import type { Meta, StoryObj } from '@storybook/react'

import { mockArchiveQuestionItem } from '../../fixtures'
import { QuestionCard } from './index'

const meta = {
  component: QuestionCard,
} satisfies Meta<typeof QuestionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    data: { ...mockArchiveQuestionItem() },
  },
} satisfies Story
