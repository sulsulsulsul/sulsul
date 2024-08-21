import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeSelection from '.';

const meta = {
  component: PracticeSelection,
} satisfies Meta<typeof PracticeSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    setModal: () => {},
  },
} satisfies Story;
