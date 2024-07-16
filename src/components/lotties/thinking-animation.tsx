'use client'

import animationData from '@/components/lotties/assets/face-thinking.json'
import { cn } from '@/lib/utils'
import { LottieComponentProps } from 'lottie-react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})
interface ThinkingAnimationProps
  extends Omit<LottieComponentProps, 'animationData'> {}

export const ThinkingAnimation = ({
  className,
  ...props
}: ThinkingAnimationProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  )
}
