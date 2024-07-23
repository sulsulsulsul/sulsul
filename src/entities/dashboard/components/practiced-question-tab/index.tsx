import { HTMLAttributes } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

import { PracticedQuestionTabType } from '../../types'

interface PracticedQuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  unansweredCount: number
  hintUsedCount: number
  favoriteCount: number
  onTabChange?: (value: PracticedQuestionTabType) => void
}

export const PracticedQuestionTab = ({
  className,
  unansweredCount,
  hintUsedCount,
  favoriteCount,
  onTabChange,
  ...props
}: PracticedQuestionTabProps) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        onValueChange={(value) => {
          onTabChange?.(value as PracticedQuestionTabType)
        }}
        defaultValue="unanswered"
      >
        <TabsList>
          <TabsTrigger value="unanswered">
            답하지 못했던 {unansweredCount > 0 && <>{unansweredCount}</>}
          </TabsTrigger>
          <TabsTrigger value="hint-used">
            힌트를 본 {hintUsedCount > 0 && <>{hintUsedCount}</>}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            즐겨 찾기한 {favoriteCount > 0 && <>{favoriteCount}</>}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
