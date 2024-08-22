import type { Meta, StoryObj } from '@storybook/react';

import { mockArchiveDetailDTO } from '../../fixtures';
import { InterviewQuestions } from './';

const meta = {
  component: InterviewQuestions,
} satisfies Meta<typeof InterviewQuestions>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = mockArchiveDetailDTO();

export const Default = {
  args: {
    data: mockData,
  },
  render: (props) => (
    <InterviewQuestions className="max-w-[600px]" {...props} />
  ),
} satisfies Story;
