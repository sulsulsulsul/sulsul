import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4308-9475&t=OZrGkP4ZgEF84mEl-1
 */
export const Dashboard = ({ className, ...props }: DashboardProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* Practice Start Section */}
      {/* Practice Status Section
      - 술술 말한 면접질문
      - 답변 못한 면접 질문
      - 총 연습 시간
     */}
      {/* Practice History List */}
      {/* Practice History Chart */}
    </div>
  )
}
