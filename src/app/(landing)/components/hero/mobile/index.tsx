'use client';

import { HTMLAttributes, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Video = dynamic(
  () => import('@/components/shared/video').then((mod) => mod.Video),
  {
    ssr: false,
  },
);

interface HeroProps extends HTMLAttributes<HTMLDivElement> {}

export const MobileHero = ({ className, ...props }: HeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [completedTextAnimation, setCompletedTextAnimation] = useState(false);
  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: -100,
      autoAlpha: 0,
      onComplete: () => {
        setCompletedTextAnimation(true);
      },
    });
    // get current state
  });

  useGSAP(() => {
    if (!videoLoaded || !completedTextAnimation) return;
    gsap.from(videoContainer.current, {
      opacity: 0,
      autoAlpha: 0,
    });
  }, [videoLoaded, completedTextAnimation]);

  return (
    <div className={cn('relative  mb-8 h-fit', className)} {...props}>
      <div className="absolute top-0 z-0 mb-8 size-full h-[466px] pb-[64px]">
        <Image src="/images/hero.png" fill priority alt="hero-bg" />
      </div>
      <div ref={container} className="invisible">
        <div className="flex w-full flex-col items-center justify-center pt-[88px] text-center">
          <h2 className="text-4xl font-bold text-white  sm:text-6xl">
            답변이 술술 면접이 술술 <br /> 취업면접 올킬 작전
          </h2>
          <div className="mt-2 text-white ">
            <div className="text-sm font-medium">
              자소서 기반 면접질문
              <br />
              예상부터 면접 단골 기출문제까지!
            </div>
          </div>
          <Button
            variant={'black'}
            className="font-semi mt-[30px] size-fit px-4 py-2 text-base"
          >
            무료로 시작하기
          </Button>
        </div>
      </div>
      <div
        ref={videoContainer}
        className="invisible relative z-10 mx-6 mt-[36px] h-[184px] w-[327px]"
      >
        <Video
          hero={true}
          onLoadedMetadata={() => setVideoLoaded(true)}
          className="z-50 rounded-[30px]"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          preload="auto"
        />
      </div>
    </div>
  );
};
