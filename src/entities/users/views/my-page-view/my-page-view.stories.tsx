import * as authActions from 'next-auth/react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { createMock } from 'storybook-addon-module-mock'

import * as userActions from '@/entities/users/actions'

import { UserDTO } from '../../types'
import { MyPageView } from './'

const meta = {
  component: MyPageView,
} satisfies Meta<typeof MyPageView>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        const useSession = createMock(authActions, 'useSession')
        const updateUserNicknameAction = createMock(
          userActions,
          'updateUserNicknameAction',
        )
        useSession.mockImplementation(() => {
          return {
            status: 'authenticated',
            data: {
              user: {
                image:
                  'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
                data: {
                  userId: 1,
                  nickname: 'test',
                  email: 'test@gmail.com',
                } as UserDTO,
              },
            } as any,
            update: fn(),
          }
        })

        return [useSession, updateUserNicknameAction]
      },
    },
  },
  args: {},
} satisfies Story
