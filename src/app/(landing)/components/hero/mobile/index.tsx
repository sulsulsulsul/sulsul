'use client';

import { HTMLAttributes, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { AuthSignedIn } from '@/components/auth/auth-signed-in';
import { AuthSignedOut } from '@/components/auth/auth-signed-out';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SignInView } from '@/entities/auth/views/sign-in-view';
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

  return (
    <div className={cn('relative  mb-8 h-fit', className)} {...props}>
      <div className="absolute top-0 z-0 mb-8 size-full h-[466px] pb-[64px]">
        <Image src="/images/hero.png" fill priority alt="hero-bg" />
      </div>
      <div ref={container} className="invisible">
        <div className="flex w-full flex-col items-center justify-center pt-[88px] text-center">
          <h2 className="text-4xl font-bold text-white  sm:text-6xl">
            내 자소서는 다 썼는데,
            <br />
            면접 준비가 막막하다면?
          </h2>
          <div className="mt-2 text-white ">
            <div className="text-sm font-medium">
              자소서 기반 면접질문 <br />
              예측부터 면접 단골 기출문제까지!
            </div>
          </div>
          <AuthSignedIn>
            <Button
              variant={'black'}
              className="mt-[30px] px-4 py-[8.5px]  text-base font-medium"
              onClick={() => router.push('/archive/create')}
            >
              무료로 시작하기
            </Button>
          </AuthSignedIn>
          <AuthSignedOut>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={'black'}
                  className="mt-[30px] px-4 py-[8.5px]  text-base font-medium"
                >
                  무료로 시작하기
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <SignInView callbackUrl="/" />
              </AlertDialogContent>
            </AlertDialog>
          </AuthSignedOut>
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
