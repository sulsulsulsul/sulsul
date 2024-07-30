import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import PracticeList from '.'

const meta = {
  component: PracticeList,
} satisfies Meta<typeof PracticeList>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
