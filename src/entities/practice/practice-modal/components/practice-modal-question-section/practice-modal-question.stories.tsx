import type { Meta, StoryObj } from '@storybook/react';

import PracticeModalQuestionSection from '.';

const meta = {
  component: PracticeModalQuestionSection,
} satisfies Meta<typeof PracticeModalQuestionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    finalList: [],
    setFinalList: () => {},
    focusedResume: 0,
    selectedQuestionIds: [],
    setSelectedQuestionIds: () => {},
  },
} satisfies Story;
