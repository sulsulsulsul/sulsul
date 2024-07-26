import type { Meta, StoryObj } from '@storybook/react'

import { ListDialog } from '.'

const meta: Meta<typeof ListDialog> = {
  component: ListDialog,
} satisfies Meta<typeof ListDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    dialogListContent: [
      [
        {
          message: '사용자',
          className: 'font-bold',
        },
        {
          message: '님, 만나서 반가워요',
          className: 'font-normal',
        },
      ],
    ],
    id: 'greeting',
    hidden: false,
    iconMessage: '/images/hand-wave.svg',
    firstDialog: true,
  },
} satisfies Story

export const List = {
  args: {
    dialogListContent: [
      [
        {
          message: '내 자기소개를 기반으로 예측한 ',
          className: 'font-normal',
        },
      ],
      [
        {
          message: '면접 예상질문을 대비',
          className: 'font-bold',
        },
        {
          message: '할 수 있어요.',
          className: 'font-normal',
        },
      ],
      [
        {
          message: '스스로 ',
          className: 'font-normal',
        },
        {
          message: '말해보는 연습 ',
          className: 'font-bold',
        },
        {
          message: '해요',
          className: 'font-normal',
        },
      ],
      [
        {
          message: '최다빈출 ',
          className: 'font-normal',
        },
        {
          message: '면접 기출문제를 풀어요',
          className: 'font-bold',
        },
      ],
    ],
    id: 'list',
  },
} satisfies Story
