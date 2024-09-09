import type { Meta, StoryObj } from '@storybook/react';

import Practice from '.';

const meta = {
  component: Practice,
} satisfies Meta<typeof Practice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: 14,
  },
} satisfies Story;
