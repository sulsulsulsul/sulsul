import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import MyResumeSelection from '.';

const meta = {
  component: MyResumeSelection,
} satisfies Meta<typeof MyResumeSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
    companyName: '술술',
    resetChecked: false,
    archiveId: 137,
    selectAll: false,
    setSelectArchives: () => {},
  },
} satisfies Story;
