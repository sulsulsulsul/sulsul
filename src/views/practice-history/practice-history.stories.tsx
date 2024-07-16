import type { Meta, StoryObj } from '@storybook/react'

import { PracticeHistory } from './'

const meta = {
  component: PracticeHistory,
} satisfies Meta<typeof PracticeHistory>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
