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

export const DesktopHero = ({ className, ...props }: HeroProps) => {
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
    <div
      className={cn(
        'relative bg-white sm:min-h-screen pb-[30px] sm:pb-[100px]',
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 z-0 h-[935px] w-full">
        <Image src="/images/hero.png" fill priority alt="hero-bg" />
      </div>
      <div ref={container} className="invisible">
        <div className="flex w-full flex-col items-center justify-center pt-[120px] text-center">
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            자소서는 다 썼는데,
          </h2>
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            면접 준비가 막막하다면?
          </h2>
          <div className="mt-2 text-xl font-medium text-white ">
            <p>자소서 기반 면접질문 예측부터 면접 단골 기출문제까지!</p>
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
        className="container invisible relative z-10 mt-[60px] h-[678px] w-[1200px] drop-shadow-hero"
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
  );
};
