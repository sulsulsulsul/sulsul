import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface PendingInterviewQuestionProps
  extends HTMLAttributes<HTMLDivElement> {}

export const PendingStatus = ({
  className,
  ...props
}: PendingInterviewQuestionProps) => {
  return (
    <div className={cn('h-full overflow-hidden', className)} {...props}>
      <div className="flex size-full flex-col gap-2 ">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                'relative h-[65vh] w-full rounded-md bg-gray-100 overflow-hidden card--skeleton',
              )}
            >
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          ))}
      </div>
    </div>
  )
}
