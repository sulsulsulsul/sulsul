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
    reset: () => {},
    resetResume: false,
    setResetResume: () => {},
    selectArchiveIds: [],
    setSelectedArchiveIds: () => {},
    allResumes: false,
    setAllResumes: () => {},
  },
} satisfies Story;
