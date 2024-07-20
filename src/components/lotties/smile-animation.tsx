'use client'
import dynamic from 'next/dynamic'
import { LottieComponentProps } from 'lottie-react'

import animationData from '@/components/lotties/assets/face-smile.json'
import { cn } from '@/lib/utils'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})

interface SmileAnimationProps
  extends Omit<LottieComponentProps, 'animationData'> {}

export const SmileAnimation = ({
  className,
  ...props
}: SmileAnimationProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  )
}
