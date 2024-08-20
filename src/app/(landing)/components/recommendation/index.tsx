'use client';

import { HTMLAttributes, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { cn } from '@/lib/utils';
interface RecommendationProps extends HTMLAttributes<HTMLDivElement> {}

export const Recommendation = ({
  className,
  ...props
}: RecommendationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 30%',
      end: 'bottom 30%',
      animation: gsap.to(textRef.current, {
        opacity: 1,
      }),
      toggleActions: 'play none none reverse',
    });
  });
  return (
    <div
      ref={containerRef}
      className={cn('bg-gray-800 py-[10vh]', className)}
      {...props}
    >
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <h3 className="w-fit bg-gradient-to-r from-[#C8CFFF] to-[#576CFB] bg-clip-text text-4xl font-bold text-transparent">
          이런 분들께 추천해요
        </h3>
        <div className="text-center text-3xl text-white sm:text-6xl">
          <p className="flex flex-col font-extralight sm:flex-row">
            <span>서류까지는 항상 붙는데,</span>
            <span className="font-semibold">늘 면접에서 탈락이라면?</span>
          </p>
          <p
            ref={textRef}
            className="mt-3 flex flex-col font-extralight opacity-[0.16] sm:flex-row"
          >
            <span>좋은 면접 제안이 들어왔는데,</span>
            <span className="font-semibold">이 기회를 놓치고 싶지 않다면?</span>
          </p>
        </div>
      </div>
    </div>
  );
};
