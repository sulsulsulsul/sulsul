import type { Meta, StoryObj } from '@storybook/react'

import { faker } from '@/lib/faker'
import { FeedbackSectionComplete } from './index'

const meta = {
  component: FeedbackSectionComplete,
} satisfies Meta<typeof FeedbackSectionComplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    goodFeedback: faker.lorem.paragraph(10),
    badFeedback: faker.lorem.paragraph(10),
  },
  render: (args) => (
    <FeedbackSectionComplete className="max-w-[500px]" {...args} />
  ),
} satisfies Story
