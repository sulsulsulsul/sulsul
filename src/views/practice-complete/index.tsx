import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface PracticeCompleteProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4382-15805&t=OZrGkP4ZgEF84mEl-1
 */
export const PracticeComplete = ({
  className,
  ...props
}: PracticeCompleteProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 연습 결과 한줄 요약 */}
      {/* 캐릭터 */}
      {/* 연습 결과 카드
        - 술술 말한 면접질문
        - 답변 못한 면접질문
        - 총 답변 시간
      */}
      {/* 
        - 전체 다시하기
        - 답변 못한 질문만 다시하기
      */}

      {/* 대시보드로 돌아가기 */}
    </div>
  )
}
