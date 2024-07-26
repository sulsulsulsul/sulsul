import type { Meta, StoryObj } from '@storybook/react'

import { OnboardModal } from '.'

const meta: Meta<typeof OnboardModal> = {
  component: OnboardModal,
} satisfies Meta<typeof OnboardModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    nickname: 'USER',
  },
} satisfies Story
