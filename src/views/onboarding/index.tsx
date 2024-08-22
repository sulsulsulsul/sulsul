import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface OnboardingProps extends HTMLAttributes<HTMLDivElement> {}
/**
 *  https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4251-7729&t=OZrGkP4ZgEF84mEl-1
 */
export const Onboarding = ({ className, ...props }: OnboardingProps) => {
  return (
    <div className={cn(className)} {...props}>
      {/* 캐릭터 이미지 */}
      {/* 채팅 */}
      {/* 버튼 */}
    </div>
  );
};
