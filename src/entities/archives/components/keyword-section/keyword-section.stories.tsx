import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { mockArchiveKeyword } from '../../fixtures'
import { KeywordSection } from './index'

const meta = {
  component: KeywordSection,
} satisfies Meta<typeof KeywordSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    keywords: Array.from({ length: 5 }, () => mockArchiveKeyword()),
    onDeleteKeyword: fn(),
  },
} satisfies Story
