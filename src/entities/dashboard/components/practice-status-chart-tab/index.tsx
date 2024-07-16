import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { PracticeStatusChartTabType } from '../../types'
interface PracticedQuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  onTabChange?: (value: PracticeStatusChartTabType) => void
}

export const PracticedQuestionTab = ({
  className,

  onTabChange,
  ...props
}: PracticedQuestionTabProps) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        onValueChange={(value) => {
          onTabChange?.(value as PracticeStatusChartTabType)
        }}
        defaultValue="weekly"
      >
        <TabsList>
          <TabsTrigger value="weekly">주간</TabsTrigger>
          <TabsTrigger value="monthly">월간</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
