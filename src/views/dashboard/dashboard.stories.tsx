import type { Meta, StoryObj } from '@storybook/react';

import Dashboard from '.';

const meta = {
  component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: 14,
  },
} satisfies Story;
