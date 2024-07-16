import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface FeedbackSectionCompleteProps extends HTMLAttributes<HTMLDivElement> {
  goodFeedback: string
  badFeedback: string
}

export const FeedbackSectionComplete = ({
  className,
  goodFeedback: good,
  badFeedback: bad,
  ...props
}: FeedbackSectionCompleteProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex flex-col justify-center rounded-base bg-gray-50 p-5 ">
        <div>
          <p className="mb-1 text-xs font-semibold text-blue-500">좋은점</p>
          <p>{good}</p>
        </div>
        <div className="mt-5">
          <p className="mb-1 text-xs font-semibold text-red-500">개선점</p>
          <p>{bad}</p>
        </div>
      </div>
    </div>
  )
}
