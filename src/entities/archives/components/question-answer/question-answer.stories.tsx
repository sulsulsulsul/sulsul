import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { mockArchiveKeyword } from '../../fixtures'
import { QuestionAnswer } from './index'

const meta = {
  component: QuestionAnswer,
  parameters: {
    tags: ['!autodocs'],
  },
} satisfies Meta<typeof QuestionAnswer>

export default meta
type Story = StoryObj<typeof meta>

const dummyText = `MVP 테스트를 진행하면서 어려웠던 점은 코로나 시기에 직접 현장에 나가서 시민들의 의견을 수집하는 일이었습니다. 처음에는 시민들에게 접근하는 과정에서 약간의 어색함을 느꼈지만 친근한 대화를 나누는 자세로 설문 조사의 목적과 중요성을 명확하게 전달하고, 간결하고 효율적인 설문지를 사용하여 참여를 유도했습니다. 이러한 노력 덕분에 목표 이상의 참여율을 달성할 수 있있고, 익숙하지 않은 상황에서도 안정적으로 대응할 수 있는 유연함을 얻을 수 있었습니다.`

export const Default = {
  args: {
    answer: dummyText,
    onCreateKeywordNote: fn(),
    keywords: [
      mockArchiveKeyword(),
      mockArchiveKeyword(),
      mockArchiveKeyword(),
    ],
  },
  render: (args) => <QuestionAnswer className="max-w-[500px]" {...args} />,
} satisfies Story
