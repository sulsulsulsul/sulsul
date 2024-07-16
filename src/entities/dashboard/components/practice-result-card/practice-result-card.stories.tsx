import type { Meta, StoryObj } from '@storybook/react'

import { PracticeResultCard } from '.'

const meta = {
  component: PracticeResultCard,
} satisfies Meta<typeof PracticeResultCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    type: 'good',
    value: 32,
    className: 'w-[273px]',
  },
} satisfies Story
