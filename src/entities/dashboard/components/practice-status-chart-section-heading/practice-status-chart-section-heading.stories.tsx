import type { Meta, StoryObj } from '@storybook/react'

import { PracticeStatusChartSectionHeading } from './'

const meta = {
  component: PracticeStatusChartSectionHeading,
} satisfies Meta<typeof PracticeStatusChartSectionHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
