import type { Meta, StoryObj } from '@storybook/react'

import Layout from '@/app/(routes)/layout'
import * as actions from '@/entities/archives/actions'
import { createMock } from 'storybook-addon-module-mock'
import { mockGetArchiveListAction } from '../../fixtures'
import { ArchiveListView } from './'

const meta = {
  component: ArchiveListView,
} satisfies Meta<typeof ArchiveListView>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        const getArchiveListAction = createMock(actions, 'getArchiveListAction')
        getArchiveListAction.mockImplementation(mockGetArchiveListAction)
        const deleteArchiveAction = createMock(actions, 'deleteArchiveAction')
        deleteArchiveAction.mockImplementation(async () => {})
        return [actions.getArchiveListAction, actions.deleteArchiveAction]
      },
    },
  },
  render() {
    return (
      <Layout>
        <ArchiveListView />
      </Layout>
    )
  },
} satisfies Story
