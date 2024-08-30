import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { QuestionState } from '@/entities/practice/types';

import { PracticeListTab } from '.';

const meta = {
  component: PracticeListTab,
} satisfies Meta<typeof PracticeListTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    allCount: 10,
    unansweredCount: 5,
    answeredCount: 5,
    isLoading: false,
    onTabChange: (value: QuestionState) => {},
  },
} satisfies Story;
