import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface ArchiveCreateProps extends HTMLAttributes<HTMLDivElement> {}

/**
 *
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?node-id=4022-4734&m=dev
 */
export const ArchiveCreate = ({ className, ...props }: ArchiveCreateProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 작성 폼 */}
      {/* 폼 상태 */}
    </div>
  )
}
