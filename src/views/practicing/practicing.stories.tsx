import type { Meta, StoryObj } from '@storybook/react';

import { Practicing } from './';

const meta = {
  component: Practicing,
} satisfies Meta<typeof Practicing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
