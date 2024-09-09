import type { Meta, StoryObj } from '@storybook/react';

import { PracticeStatusChart } from '.';

const meta = {} satisfies Meta;

export default meta;
type Story = StoryObj<{
  type: 'WEEKLY' | 'MONTHLY';
}>;

export const Default = {
  args: {
    type: 'WEEKLY',
  },

  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['WEEKLY', 'MONTHLY'],
    },
  },
  render: ({ type }) => {
    const data =
      type === 'WEEKLY' ? generateRandomData(7) : generateRandomData(30);
    return <PracticeStatusChart type={type} data={data} />;
  },
} satisfies Story;

function generateRandomData(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}
