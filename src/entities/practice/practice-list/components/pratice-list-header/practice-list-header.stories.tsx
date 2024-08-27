import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeListHeader from '.';

const meta = {
  component: PracticeListHeader,
} satisfies Meta<typeof PracticeListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    setFilter: () => {},
    setHint: () => {},
    setPage: () => {},
    setSelectAll: () => {},
    selectAll: false,
  },
} satisfies Story;

// setFilter: Dispatch<SetStateAction<FilterType>>;
// setHint: Dispatch<SetStateAction<HintType>>;
// setPage: Dispatch<SetStateAction<number>>;
// setSelectAll: Dispatch<SetStateAction<boolean>>;
// selectAll: boolean;
