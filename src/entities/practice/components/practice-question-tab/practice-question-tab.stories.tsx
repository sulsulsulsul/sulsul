import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PracticedQuestionTab } from '.';

const meta = {
  args: {
    onChangeTab: fn(),
  },
  component: PracticedQuestionTab,
} satisfies Meta<typeof PracticedQuestionTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTab: 'favorite',
  },
};

export const NoUnanswered: Story = {
  args: {
    selectedTab: 'unanswered',
  },
};

export const NoHintsUsed: Story = {
  args: {
    selectedTab: 'hintUsed',
  },
};

export const NoFavorites: Story = {
  args: {
    selectedTab: 'favorite',
  },
};
