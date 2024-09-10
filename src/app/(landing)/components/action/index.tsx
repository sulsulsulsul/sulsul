'use client';

import { HTMLAttributes, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface ReasonProps extends HTMLAttributes<HTMLDivElement> {}

export const Action = ({ className, ...props }: ReasonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
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
                className="mt-10 w-fit px-8 text-lg font-bold mobile:hidden"
              >
                내 면접질문 예측하기
              </Button>
              <Button
                variant={'black'}
                className="mt-[30px] w-fit px-4 py-[8.5px] text-base font-semibold desktop:hidden"
              >
                무료로 시작하기
              </Button>
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
