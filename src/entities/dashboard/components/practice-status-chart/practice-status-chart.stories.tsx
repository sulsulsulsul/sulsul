import type { Meta, StoryObj } from '@storybook/react';

import { PracticeStatusChart } from '.';

const meta = {} satisfies Meta;

export default meta;
type Story = StoryObj<{
  type: 'weekly' | 'monthly';
}>;

export const Default = {
  args: {
    type: 'weekly',
  },

  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['weekly', 'monthly'],
    },
  },
  render: ({ type }) => {
    const data =
      type === 'weekly' ? generateRandomData(7) : generateRandomData(30);
    return <PracticeStatusChart type={type} data={data} />;
  },
} satisfies Story;

function generateRandomData(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}
