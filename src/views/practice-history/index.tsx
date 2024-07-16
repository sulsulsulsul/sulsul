import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface PracticeHistoryProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4325-9343&t=OZrGkP4ZgEF84mEl-1
 */
export const PracticeHistory = ({
  className,
  ...props
}: PracticeHistoryProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* Heading */}
      {/* Tab */}
      {/* Practice History Table */}
      {/* Pagination */}
    </div>
  )
}
