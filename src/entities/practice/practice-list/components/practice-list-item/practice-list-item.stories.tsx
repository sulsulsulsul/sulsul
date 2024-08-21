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
      archiveId: 137,
      title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
      content:
        'SK SUNNY 사회변화 챌린지 프로젝트에 참여하신 동기는 무엇이었나요?',
      companyName: '술술',
      lastPracticeAt: '',
      isStar: true,
      isHint: true,
      questionId: 198,
      practiceCount: 5,
      practiceTime: 10,
      answer: ' ',
      isAnswered: true,
      practiceStatus: 'ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: '',
        improvePoint: '',
        content: '',
        status: 'READY',
      },
      keywords: [{ keywordId: 0, content: '' }],
    },
    setSelectQuestion: () => {},
  },
} satisfies Story;
export const Active = {
  args: {
    question: {
      archiveId: 137,
      lastPracticeAt: '',
      title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
      content:
        'SK SUNNY 사회변화 챌린지 프로젝트에 참여하신 동기는 무엇이었나요?',
      companyName: '술술',
      isStar: false,
      isHint: false,
      questionId: 198,
      practiceCount: 5,
      practiceTime: 10,
      answer: ' ',
      isAnswered: true,
      practiceStatus: 'ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: '',
        improvePoint: '',
        content: '',
        status: 'READY',
      },
      keywords: [{ keywordId: 0, content: '' }],
    },
    setSelectQuestion: () => {},
  },
} satisfies Story;
