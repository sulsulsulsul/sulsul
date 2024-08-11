import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeListHeader from '.';

const meta = {
  component: PracticeListHeader,
} satisfies Meta<typeof PracticeListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
