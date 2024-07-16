import type { Meta, StoryObj } from '@storybook/react'

import { FeedbackSectionPending } from './index'

const meta = {
  component: FeedbackSectionPending,
} satisfies Meta<typeof FeedbackSectionPending>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
