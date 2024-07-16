import type { Meta, StoryObj } from '@storybook/react'

import { ArchiveListView } from './'

const meta = {
  component: ArchiveListView,
} satisfies Meta<typeof ArchiveListView>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
