import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './'

const meta = {
  component: SignIn,
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story
