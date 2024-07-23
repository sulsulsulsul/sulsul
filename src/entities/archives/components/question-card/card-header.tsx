import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  content: string
}

export const CardHeader = ({
  className,
  content,
  ...props
}: CardHeaderProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex w-full items-center justify-start gap-2 border-none p-0 py-2">
        <div className="size-[9.6px] rounded-full bg-gray-200" />
        <p className="grow text-left text-gray-700">{content}</p>
      </div>
    </div>
  )
}
