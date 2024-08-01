import type { Meta, StoryObj } from '@storybook/react'

import { AvatarSuri } from '.'

const meta: Meta<typeof AvatarSuri> = {
  component: AvatarSuri,
} satisfies Meta<typeof AvatarSuri>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
