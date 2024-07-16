'use client'
import animationData from '@/components/lotties/assets/confetti.json'
import { cn } from '@/lib/utils'
import { LottieComponentProps } from 'lottie-react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})
interface ConfettiAnimationProps
  extends Omit<LottieComponentProps, 'animationData'> {}

export const ConfettiAnimation = ({
  className,
  ...props
}: ConfettiAnimationProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  )
}
