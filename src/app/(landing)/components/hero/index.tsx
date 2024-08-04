'use client'

import { HTMLAttributes, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Video = dynamic(
  () => import('@/components/shared/video').then((mod) => mod.Video),
  {
    ssr: false,
  },
)

interface HeroProps extends HTMLAttributes<HTMLDivElement> {}

export const Hero = ({ className, ...props }: HeroProps) => {
  const container = useRef<HTMLDivElement>(null)
  const videoContainer = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [completedTextAnimation, setCompletedTextAnimation] = useState(false)
  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: -100,
      autoAlpha: 0,
      onComplete: () => {
        setCompletedTextAnimation(true)
      },
    })
    // get current state
  })

  useGSAP(() => {
    if (!videoLoaded || !completedTextAnimation) return
    gsap.from(videoContainer.current, {
      opacity: 0,
      autoAlpha: 0,
    })
  }, [videoLoaded, completedTextAnimation])

  return (
    <div
      className={cn(
        'relative sm:min-h-screen pb-[30px] sm:pb-[100px]',
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 z-0 size-full">
        <Image src="/images/hero.png" fill priority alt="hero-bg" />
      </div>
      <div ref={container} className="invisible">
        <div className="flex w-full flex-col items-center justify-center pt-[130px] text-center">
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            내 자기소개서를 기반으로
          </h2>
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            시작하는 면접 준비
          </h2>
          <div className="mt-2 text-white ">
            <p className="hidden sm:block">
              인공지능 수리가 내 자소서를 토대로 면접질문을 예측해드려요.
            </p>
            <div className="text-sm font-medium sm:hidden">
              <p>인공지능 수리가 내 자소서를</p>
              <p>토대로 면접질문을 예측해드려요.</p>
            </div>
          </div>
          <Button
            variant={'black'}
            className="mt-8 px-8 text-base font-bold sm:text-xl"
          >
            내 면접질문 예측하기
          </Button>
        </div>
      </div>
      <div
        ref={videoContainer}
        className="container invisible relative z-10 mt-[60px] h-fit"
      >
        <Video
          hero={true}
          onLoadedMetadata={() => setVideoLoaded(true)}
          className="rounded-[30px]"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          preload="auto"
        />
      </div>
    </div>
  )
}
