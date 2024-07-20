'use client'

// import { Video } from '@/components/shared/video'
import { HTMLAttributes, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'

import { StepList } from './step-list'
import { StepVideos } from './step-videos'

interface StepSectionProps extends HTMLAttributes<HTMLDivElement> {}

export const DesktopSteps = ({ className, ...props }: StepSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [videoState, setVideoState] = useState<'paused' | 'play'>('paused')

  useGSAP(
    () => {
      if (!containerRef.current) return
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '0px 10px',
        end: '2100px 10px',
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          setVideoState('play')
        },
        onUpdate: (self) => {
          const progress = self.progress
          if (progress < 0.3) {
            setStep(0)
          }
          if (progress >= 0.3 && progress < 0.7) {
            setStep(1)
          }
          if (progress >= 0.7) {
            setStep(2)
          }
        },
        onLeave: () => {
          setVideoState('paused')
        },
        onLeaveBack: () => {
          setVideoState('paused')
        },
        onEnterBack: () => {
          setVideoState('play')
        },
      })
    },
    { scope: containerRef, dependencies: [] },
  )

  return (
    <div className={cn('relative bg-white', className)} {...props}>
      <div className="py-[100px]" ref={containerRef}>
        <div className="text-center text-6xl font-bold text-gray-800">
          <h2>술술과 함께하는</h2>
          <h2>면접 완성 프로젝트</h2>
        </div>

        <div>
          <div className="sticky mx-auto grid w-[1200px] grid-cols-2 pt-[80px]">
            <div className="relative">
              <StepVideos videoState={videoState} activeStep={step} />
            </div>
            <div className="flex flex-col gap-[30px] p-[64px] pl-[124px]">
              <StepList activeStep={step} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
