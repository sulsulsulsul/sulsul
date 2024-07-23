import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface ArchiveDetailProps extends HTMLAttributes<HTMLDivElement> {}
/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4055-6549&t=OZrGkP4ZgEF84mEl-1
 */
export const ArchiveDetail = ({ className, ...props }: ArchiveDetailProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* Archive Detail Card */}
      {/* Questions List */}
    </div>
  )
}
