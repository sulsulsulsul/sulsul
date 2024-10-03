'use client';

import { HTMLAttributes, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  const router = useRouter();
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

  const copiedLink = 'https://sulsul-git-main-sulsul.vercel.app/';

  return (
    <div className={cn('relative  mb-8 h-fit', className)} {...props}>
      <div className="absolute top-0 z-0 mb-8 size-full h-[466px] pb-[64px]">
        <Image src="/images/hero.png" fill priority alt="hero-bg" />
      </div>
      <div ref={container} className="invisible">
        <div className="flex w-full flex-col items-center justify-center pt-[88px] text-center">
          <h2 className="text-4xl font-bold text-white  sm:text-6xl">
            자소서는 다 썼는데,
            <br />
            면접 준비가 막막하다면?
          </h2>
          <div className="mt-2 text-white ">
            <div className="text-sm font-medium">
              내 자소서 기반 면접질문 <br />
              예측부터 면접 단골 기출문제까지!
            </div>
          </div>
          <Sheet>
            <SheetTrigger>
              <p className="mt-[30px] rounded-[30px] bg-gray-800 px-4  py-[8.5px] text-base font-medium  text-white hover:bg-gray-700">
                무료로 시작하기
              </p>
            </SheetTrigger>
            <SheetContent
              side={'rightFull'}
              className="justify-start overflow-y-scroll"
            >
              <div className="mt-[32px] flex size-full flex-col items-center justify-start">
                <Image
                  src="/images/mobile-title.png"
                  width={255}
                  height={180}
                  alt="mobile-title"
                />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-semibold">
                    PC버전으로 접속해주세요
                  </span>
                  <span className="font-normal text-gray-500">
                    면접질문 예측은 PC 환경에서 가능해요.
                  </span>
                </div>
                <Button
                  variant={'black'}
                  className="mt-6 py-[8.5px] font-medium"
                  onClick={() => {
                    navigator.clipboard.writeText(copiedLink);
                  }}
                >
                  <Image
                    className="mr-1"
                    src="/images/icons/icon-link-white.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />{' '}
                  술술 링크 복사
                </Button>
                <Image
                  className="mt-[129px]"
                  src="/images/mobile-direct.svg"
                  width={327}
                  height={220}
                  alt="mobile-direct"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div
        ref={videoContainer}
        className="invisible relative z-10 mx-6 mt-[36px] drop-shadow-hero"
      >
        <Video
          hero={true}
          onLoadedMetadata={() => setVideoLoaded(true)}
          className="rounded-base"
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
