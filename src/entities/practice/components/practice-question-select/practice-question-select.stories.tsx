import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PracticeQuestionSelect } from '.';

const meta = {
  args: {
    handleSelect: fn(),
  },
  component: PracticeQuestionSelect,
} satisfies Meta<typeof PracticeQuestionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        isSelect: true,
        title: 'Software Engineer',
        id: '1',
      },
      {
        isSelect: false,
        title: 'Software Engineer',
        id: '2',
      },
      {
        isSelect: false,
        title: 'Software Engineer',
        id: '3',
      },
    ],
  },
};
