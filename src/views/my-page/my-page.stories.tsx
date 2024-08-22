import type { Meta, StoryObj } from '@storybook/react';

import { MyPage } from './';

const meta = {
  component: MyPage,
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
