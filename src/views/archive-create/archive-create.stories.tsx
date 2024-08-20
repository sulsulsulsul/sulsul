import type { Meta, StoryObj } from '@storybook/react';

import { ArchiveCreate } from './';

const meta = {
  component: ArchiveCreate,
} satisfies Meta<typeof ArchiveCreate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
