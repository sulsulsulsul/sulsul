import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface SignInProps extends HTMLAttributes<HTMLDivElement> {}
/**
 *  https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4251-7383&t=hglQSnk5HamA3VsA-1
 */
export const SignIn = ({ className, ...props }: SignInProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 헤딩 */}
      {/* 케릭터 이미지 */}
      {/* 카카오 로그인 버튼 */}
      {/* 구글 로그인 버튼 */}
      {/* 약관 */}
    </div>
  )
}
