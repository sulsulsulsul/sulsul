import type { Meta, StoryObj } from '@storybook/react';

import PracticeModalOption from '.';

const meta = {
  component: PracticeModalOption,
} satisfies Meta<typeof PracticeModalOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    random: false,
    setRandom: () => {},
    setTimer: () => {},
  },
} satisfies Story;
