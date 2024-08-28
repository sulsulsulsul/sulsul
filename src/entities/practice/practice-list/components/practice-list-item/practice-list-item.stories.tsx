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
        companyName: '술술',
        title: '술술제목',
      },
      questionId: 0,
      content: '이력서 컨텐츠',
      practiceStatus: 'NOT_PRACTICE',
      practiceCount: 0,
      practiceTime: 0,
      hint: false,
      star: false,
      lastPracticeAt: '',
    },
    selectAll: false,
    setSelectQuestion: () => {},
    collect: [],
    page: 0,
  },
} satisfies Story;
export const Active = {
  args: {
    question: {
      archive: {
        archiveId: 0,
        companyName: '술술',
        title: '술술제목',
      },
      questionId: 0,
      content: '이력서 컨텐츠',
      practiceStatus: 'NOT_PRACTICE',
      practiceCount: 0,
      practiceTime: 0,
      hint: true,
      star: true,
      lastPracticeAt: '',
    },
    selectAll: true,
    setSelectQuestion: () => {},
    collect: [],
    page: 0,
  },
} satisfies Story;
