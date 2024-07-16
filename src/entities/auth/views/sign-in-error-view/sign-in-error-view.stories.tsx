import * as actions from '@/entities/users/hooks'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { createMock } from 'storybook-addon-module-mock'
import { SignInErrorView } from './index'

const meta = {
  component: SignInErrorView,
} satisfies Meta<typeof SignInErrorView>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        const useCurrentUser = createMock(actions, 'useCurrentUser')
        useCurrentUser.mockImplementation(() => ({
          status: 'unauthenticated',
          update: fn(),
          user: {} as any,
        }))
        return [useCurrentUser]
      },
    },
  },
  args: {},
} satisfies Story
