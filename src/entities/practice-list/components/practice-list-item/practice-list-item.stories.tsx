import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeListItem from '.';

const meta = {
  component: PracticeListItem,
} satisfies Meta<typeof PracticeListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
