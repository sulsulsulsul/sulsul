import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'keyword', 'result'],
    },
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Badge',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
}

export const Keyword: Story = {
  args: {
    variant: 'keyword',
    children: 'Keyword Badge',
  },
}

export const Result: Story = {
  args: {
    variant: 'result',
    children: 'Result Badge',
  },
}
