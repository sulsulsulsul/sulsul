import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeModalQuestionSelection from '.';

const meta = {
  component: PracticeModalQuestionSelection,
} satisfies Meta<typeof PracticeModalQuestionSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    index: 0,
    questionId: 0,
    questionProp: {
      isAnswered: true,
      isHint: true,
      questionId: 0,
      content: '',
      answer: '',
      keywords: [],
    },
    finalList: [],
    setFinalList: () => {},
    setSelectedQuestionIds: () => {},
  },
} satisfies Story;
