'use client';

import { HTMLAttributes, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
interface ReasonProps extends HTMLAttributes<HTMLDivElement> {}

export const Action = ({ className, ...props }: ReasonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.from(textContainerRef.current, {
        opacity: 0,
      });

      tl.from(
        imageRef.current,
        {
          opacity: 0,
          y: 200,
        },
        '<',
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '0px 60%',
        end: 'bottom 60%',
        animation: tl,
      });
    },
    { scope: containerRef },
  );
  const copiedLink = 'https://sulsul-git-main-sulsul.vercel.app/';
  return (
    <div ref={containerRef} className={cn('bg-white', className)} {...props}>
      <div className="container relative size-full py-[100px] mobile:h-[386px] mobile:w-full mobile:px-6 mobile:py-[50px]">
        <div
          ref={textContainerRef}
          className="flex flex-col items-start justify-between md:flex-row"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="text-4xl font-bold text-gray-800 md:text-6xl">
                <h2>최종면접 합격률</h2>
                <h2>딱 5배 높이는 방법</h2>
              </div>
              <div className="mt-3 text-gray-600">
                <p>술술과 함께 체계적인 면접준비로 나만의</p>
                <p>면접 데이터를 정리하고 쌓아가세요.</p>
              </div>
              <Button
                variant={'black'}
                className="mt-10 hidden w-fit px-8 text-lg font-semibold desktop:flex"
                onClick={() => router.push('/archive/create')}
              >
                내 면접질문 예측하기
              </Button>
              <Sheet>
                <SheetTrigger>
                  <p className="mt-[30px] hidden  rounded-[30px] bg-gray-800 px-4 py-[8.5px]  text-base font-medium text-white  hover:bg-gray-700 mobile:flex">
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
            <div className="max-md:translate-x-5 absolute bottom-0 right-[-30px]">
              <Image
                className="w-[300px] md:w-fit"
                priority
                ref={imageRef}
                alt="comment-1"
                src="/images/action.svg"
                width={638}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
