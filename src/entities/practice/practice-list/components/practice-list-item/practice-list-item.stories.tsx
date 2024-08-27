import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeListItem from '.';

const meta = {
  component: PracticeListItem,
} satisfies Meta<typeof PracticeListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    question: {
      archive: {
        archiveId: 0,
        companyName: '',
        title: '',
      },
      questionId: 0,
      content: '',
      practiceStatus: 'NOT_PRACTICE',
      practiceCount: 0,
      practiceTime: 0,
      hint: false,
      star: false,
      lastPracticeAt: '',
    },
    selectAll: false,
    setSelectQuestion: () => {},
  },
} satisfies Story;
export const Active = {
  args: {
    question: {
      archive: {
        archiveId: 0,
        companyName: '',
        title: '',
      },
      questionId: 0,
      content: '',
      practiceStatus: 'NOT_PRACTICE',
      practiceCount: 0,
      practiceTime: 0,
      hint: false,
      star: false,
      lastPracticeAt: '',
    },
    selectAll: false,
    setSelectQuestion: () => {},
  },
} satisfies Story;
