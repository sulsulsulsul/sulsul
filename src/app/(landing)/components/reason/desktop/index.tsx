'use client';

import { HTMLAttributes, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { cn } from '@/lib/utils';
interface ReasonProps extends HTMLAttributes<HTMLDivElement> {}

const images = [
  '/images/comment-1.svg',
  '/images/comment-2.svg',
  '/images/comment-3.svg',
];

export const DesktopReason = ({ className, ...props }: ReasonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '0 60%',
        end: 'bottom 60%',
        animation: gsap.from(imageRefs.current, {
          opacity: 0,
          y: -50,
          stagger: 0.2,
        }),
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn('bg-gray-[#F6F7FB] py-[100px] ', className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-4xl font-bold text-gray-800 sm:text-6xl">
          <h2>취뽀생들이</h2>
          <h2>술술을 선택한 이유</h2>
        </div>

        <div className="mt-10 flex flex-col gap-5 sm:mt-20 sm:flex-row">
          {images.map((src, index) => (
            // @ts-ignore
            <div key={index} ref={(el) => (imageRefs.current[index] = el)}>
              <Image
                alt={`comment-${index}`}
                src={src}
                width={384}
                height={369}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
