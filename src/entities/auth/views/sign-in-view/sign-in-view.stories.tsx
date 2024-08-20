import * as actions from 'next-auth/react';
import type { Meta, StoryObj } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

import { SignInView } from './index';

const meta = {
  component: SignInView,
} satisfies Meta<typeof SignInView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  parameters: {
    moduleMock: {
      mock: () => {
        return [createMock(actions, 'signIn')];
      },
    },
  },
  args: {
    callbackUrl: '/hello-world',
  },
} satisfies Story;
