import type { Meta, StoryObj } from '@storybook/react'

import { PracticeComplete } from './'

const meta = {
  component: PracticeComplete,
} satisfies Meta<typeof PracticeComplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
