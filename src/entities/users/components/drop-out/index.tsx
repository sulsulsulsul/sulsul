import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface DropOutProps extends HTMLAttributes<HTMLDivElement> {}

export const DropOut = ({ className, ...props }: DropOutProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* TODO: 구현 */}
      <button className="px-0 font-medium text-gray-400 underline hover:opacity-80">
        탈퇴하기
      </button>
    </div>
  )
}
