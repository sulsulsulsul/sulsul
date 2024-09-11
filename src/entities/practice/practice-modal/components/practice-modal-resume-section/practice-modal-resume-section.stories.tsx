import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PracticeModalResumeSection from '.';

const meta = {
  component: PracticeModalResumeSection,
} satisfies Meta<typeof PracticeModalResumeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    resume: [],
    allResume: false,
    setAllResume: () => {},
    reset: () => {},
    selectArchiveIds: [],
    setSelectedArchiveIds: () => {},
    focusedResume: 0,
    setFocusedResume: () => {},
  },
} satisfies Story;
