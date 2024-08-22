import type { Meta, StoryObj } from '@storybook/react';

import { Onboarding } from './';

const meta = {
  component: Onboarding,
} satisfies Meta<typeof Onboarding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
