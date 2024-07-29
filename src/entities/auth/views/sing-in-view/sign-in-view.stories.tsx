import * as actions from 'next-auth/react'
import type { Meta, StoryObj } from '@storybook/react'
import { createMock } from 'storybook-addon-module-mock'

import { SingInView } from './index'

const meta = {
  component: SingInView,
} satisfies Meta<typeof SingInView>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        return [createMock(actions, 'signIn')]
      },
    },
  },
  args: {
    callbackUrl: '/hello-world',
  },
} satisfies Story
