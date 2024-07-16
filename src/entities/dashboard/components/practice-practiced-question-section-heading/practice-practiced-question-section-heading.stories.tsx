import type { Meta, StoryObj } from '@storybook/react'

import { PracticePracticedQuestionSectionHeading } from '.'

const meta = {
  component: PracticePracticedQuestionSectionHeading,
} satisfies Meta<typeof PracticePracticedQuestionSectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
