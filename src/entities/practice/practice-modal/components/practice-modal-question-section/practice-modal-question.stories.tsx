import type { Meta, StoryObj } from '@storybook/react';

import PracticeModalQuestionSection from '.';

const meta = {
  component: PracticeModalQuestionSection,
} satisfies Meta<typeof PracticeModalQuestionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedArchiveIds: [1, 2, 3],
    resetQuestion: false,
    setFinalList: () => {},
    resetQuestionList: () => {},
    answerFilter: false,
    setAnswerFilter: () => {},
    hintFilter: false,
    setHintFilter: () => {},
    allQuestions: false,
    setAllQuestions: () => {},
  },
} satisfies Story;
