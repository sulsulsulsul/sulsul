import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface ArchiveListViewProps extends HTMLAttributes<HTMLDivElement> {}

export const ArchiveListView = ({
  className,
  ...props
}: ArchiveListViewProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* Heading  */}
      {/* Sorting */}
      {/* 
      Archive Card List   
      or 
      Empty view
       */}
    </div>
  )
}
