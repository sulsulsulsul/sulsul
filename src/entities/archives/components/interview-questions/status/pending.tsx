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
      <div className="flex size-full flex-col gap-2">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                animationDelay: `${(Math.random() * i) / 10}s`,
              }}
              className={cn(
                'min-h-[74px] w-full animate-loading-expand-width rounded-md bg-gray-200',
              )}
            />
          ))}
      </div>
    </div>
  )
}
