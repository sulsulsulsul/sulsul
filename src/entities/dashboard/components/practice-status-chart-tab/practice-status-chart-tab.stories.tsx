import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { PracticedQuestionTab } from './'

const meta = {
  args: {
    onTabChange: fn(),
  },
  component: PracticedQuestionTab,
} satisfies Meta<typeof PracticedQuestionTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
