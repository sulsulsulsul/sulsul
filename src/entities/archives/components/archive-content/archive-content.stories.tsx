import type { Meta, StoryObj } from '@storybook/react';

import { mockArchiveDetailDTO } from '../../fixtures';
import { ArchiveContent } from './';

const meta = {
  parameters: {
    tags: ['autodocs'],
  },
  component: ArchiveContent,
} satisfies Meta<typeof ArchiveContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = mockArchiveDetailDTO();

export const Default = {
  args: {
    title: mockData.title,
    resume: mockData.resume,
    companyName: mockData.companyName,
    status: mockData.status,
  },
  render: (props) => <ArchiveContent className="max-w-[500px]" {...props} />,
} satisfies Story;
