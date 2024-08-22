import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'ghost',
        'green',
        'black',
        'outline',
        'kakao',
        'google',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    children: 'Default Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    disabled: false,
    children: 'Ghost Button',
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
    size: 'default',
    disabled: false,
    children: 'Green Button',
  },
};

export const Black: Story = {
  args: {
    variant: 'black',
    size: 'default',
    disabled: false,
    children: 'Black Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    disabled: false,
    children: 'Outline Button',
  },
};

export const Kakao: Story = {
  args: {
    variant: 'kakao',
    size: 'default',
    disabled: false,
    children: 'Kakao Button',
  },
};

export const Google: Story = {
  args: {
    variant: 'google',
    size: 'default',
    disabled: false,
    children: 'Google Button',
  },
};
