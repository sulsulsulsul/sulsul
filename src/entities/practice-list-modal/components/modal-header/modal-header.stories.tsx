import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import ModalHeader from '.'

const meta = {
  component: ModalHeader,
} satisfies Meta<typeof ModalHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
