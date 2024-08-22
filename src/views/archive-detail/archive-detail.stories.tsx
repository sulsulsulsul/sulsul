import type { Meta, StoryObj } from '@storybook/react';

import { ArchiveDetail } from './';

const meta = {
  component: ArchiveDetail,
} satisfies Meta<typeof ArchiveDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
