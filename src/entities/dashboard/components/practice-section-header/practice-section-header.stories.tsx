import type { Meta, StoryObj } from '@storybook/react';

import PracticeSectionHeader from './index';

const meta = {
  component: PracticeSectionHeader,
} satisfies Meta<typeof PracticeSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '내 연습 현황',
    iconSrc: '/images/icons/etc-speech.svg',
  },
};
