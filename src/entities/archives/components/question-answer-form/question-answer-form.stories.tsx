import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { QuestionAnswerForm } from './index'

const meta = {
  component: QuestionAnswerForm,
} satisfies Meta<typeof QuestionAnswerForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    onSubmit: fn(),
  },
} satisfies Story
