import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import QuestionSelection from '.';

const meta = {
  component: QuestionSelection,
} satisfies Meta<typeof QuestionSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    resetQuestion: false,
    selectAll: false,
    archiveId: 1,
    hintFilter: false,
    answerFilter: false,
    setFinalQuestions: () => {},
  },
} satisfies Story;
