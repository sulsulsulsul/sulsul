import type { Meta, StoryObj } from '@storybook/react';

import PracticeModalButton from '.';

const meta = {
  component: PracticeModalButton,
} satisfies Meta<typeof PracticeModalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    handleSubmit: () => {},
    setDisable: false,
    listCount: 10,
  },
} satisfies Story;
