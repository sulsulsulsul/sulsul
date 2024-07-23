import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface MyPageProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?node-id=5235-8535&m=dev
 *
 */
export const MyPage = ({ className, ...props }: MyPageProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 유저 프로필 이미지 */}
      {/* 닉네임 변경 폼 */}
      {/* 로그인 계정 정보 */}
      {/* 탈퇴하기 */}
    </div>
  )
}
