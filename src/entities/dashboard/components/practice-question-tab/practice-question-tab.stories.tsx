import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PracticedQuestionTab } from './';

const meta = {
  args: {
    onTabChange: fn(),
  },
  component: PracticedQuestionTab,
} satisfies Meta<typeof PracticedQuestionTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unansweredCount: 5,
    hintUsedCount: 3,
    favoriteCount: 7,
  },
};

export const NoUnanswered: Story = {
  args: {
    unansweredCount: 0,
    hintUsedCount: 2,
    favoriteCount: 4,
  },
};

export const NoHintsUsed: Story = {
  args: {
    unansweredCount: 4,
    hintUsedCount: 0,
    favoriteCount: 5,
  },
};

export const NoFavorites: Story = {
  args: {
    unansweredCount: 3,
    hintUsedCount: 6,
    favoriteCount: 0,
  },
};
