import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { PracticeArchiveSelect } from '.'

const meta = {
  args: {
    handleSelect: fn(),
  },
  component: PracticeArchiveSelect,
} satisfies Meta<typeof PracticeArchiveSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      {
        isSelect: true,
        title: 'Software Engineer',
        company: 'Tech Corp',
        id: '1',
      },
      {
        isSelect: false,
        title: 'Software Engineer',
        company: 'Tech Corp',
        id: '2',
      },
      {
        isSelect: false,
        title: 'Software Engineer',
        company: 'Tech Corp',
        id: '3',
      },
    ],
  },
}
