import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface PracticingProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4382-15211&t=0Khe7bRnJz7tpOBv-1
 */
export const Practicing = ({ className, ...props }: PracticingProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* Timer */}
      {/* Question */}
      {/* Hint */}
      {/* Answer 버튼 */}
    </div>
  )
}
