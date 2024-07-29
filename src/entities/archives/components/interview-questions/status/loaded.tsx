import { HTMLAttributes } from 'react'

import { ArchiveQuestionItem } from '@/entities/types'
import { cn } from '@/lib/utils'

import { QuestionCard } from '../../question-card'
interface LoadedInterviewQuestionProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveQuestionItem[]
}

export const LoadedStatus = ({
  className,
  data,
  ...props
}: LoadedInterviewQuestionProps) => {
  return (
    <div className={cn('h-full overflow-y-scroll', className)} {...props}>
      <div className="flex size-full flex-col gap-3">
        {data.map((question, i) => (
          <QuestionCard key={i} data={question} />
        ))}
      </div>
    </div>
  )
}
