import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { FeedbackSectionIdle } from './index'

const meta = {
  component: FeedbackSectionIdle,
} satisfies Meta<typeof FeedbackSectionIdle>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    handleCreateFeedback: fn(),
  },
} satisfies Story
