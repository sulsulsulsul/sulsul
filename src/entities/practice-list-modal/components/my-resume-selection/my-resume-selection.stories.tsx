import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import MyResumeSelection from '.'

const meta = {
  component: MyResumeSelection,
} satisfies Meta<typeof MyResumeSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
