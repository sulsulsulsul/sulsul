'use client'

import dynamic from 'next/dynamic'
import { LottieComponentProps } from 'lottie-react'

import animationData from '@/components/lotties/assets/btn-check.json'
import { cn } from '@/lib/utils'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})
interface CheckProps extends Omit<LottieComponentProps, 'animationData'> {}
/**
 * 참고 - https://lottiereact.com/components/Lottie
 */
export const CheckAnimation = ({ className, ...props }: CheckProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  )
}
