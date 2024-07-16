import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
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
