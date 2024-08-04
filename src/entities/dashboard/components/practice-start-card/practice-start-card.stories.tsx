import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PracticeStartCard } from './index';

const meta = {
  component: PracticeStartCard,
} satisfies Meta<typeof PracticeStartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    nickname: '수리수리',
    className: 'w-[300px]',
  },
} satisfies Story;
