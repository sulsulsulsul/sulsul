import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PracticedStatusChartTab } from '.';

const meta = {
  args: {
    chartType: 'weekly',
    onChangeChartType: fn(),
  },
  component: PracticedStatusChartTab,
} satisfies Meta<typeof PracticedStatusChartTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
