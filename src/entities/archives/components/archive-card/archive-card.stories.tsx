import * as actions from '@/entities/archives/actions'
import type { Meta, StoryObj } from '@storybook/react'
import { createMock } from 'storybook-addon-module-mock'
import { mockArchiveListItemDTO } from '../../fixtures'
import { ArchiveCard } from './'

const meta = {
  component: ArchiveCard,
} satisfies Meta<typeof ArchiveCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        return [createMock(actions, 'deleteArchiveAction')]
      },
    },
  },
  args: {
    ...mockArchiveListItemDTO(),
  },
} satisfies Story
