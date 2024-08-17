import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Timer from './timer';

const meta = {
  component: Timer,
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    setTime: () => {},
    pauseTimer: false,
  },
} satisfies Story;
