import { HTMLAttributes } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface PracticedQuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  question: string
  title: string
  company: string
  handleRetry: () => void
}

export const PracticedQuestionCard = ({
  className,
  question,
  title,
  company,
  handleRetry,
  ...props
}: PracticedQuestionCardProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md border bg-white p-6 shadow-base',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold">{question}</h4>
        <div className="flex items-center gap-[6px] text-gray-500">
          <div className="w-fit rounded-sm bg-gray-100 px-[7px] py-[10px] text-2xs font-medium ">
            {company}
          </div>
          <p className="text-sm font-medium">{title}</p>
        </div>
      </div>

      <Button size={'sm'} variant={'green'} onClick={handleRetry}>
        다시 연습
      </Button>
    </div>
  )
}
