'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
interface ReasonProps extends HTMLAttributes<HTMLDivElement> {}

const images = [
  '/images/comment-1.svg',
  '/images/comment-2.svg',
  '/images/comment-3.svg',
];

export const MobileReason = ({ className, ...props }: ReasonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
      className={cn('bg-gray-[#F6F7FB] py-[50px] px-6', className)}
      {...props}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="text-center text-4xl font-bold text-gray-800 ">
          <h2>취뽀생들이</h2>
          <h2>술술을 선택한 이유</h2>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            setApi={setApi}
            className="flex justify-center"
          >
            <CarouselContent>
              {images.map((src, index) => (
                // @ts-ignore
                <CarouselItem key={index}>
                  <div
                    key={index}
                    ref={(el: any) => (imageRefs.current[index] = el)}
                    className="flex justify-center"
                  >
                    <Image
                      alt={`comment-${index}`}
                      src={src}
                      width={384}
                      height={369}
                      priority
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-4 flex flex-row">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`mx-1 size-2 rounded-full bg-gray-300 ${
                  index + 1 === current ? 'bg-gray-600' : ''
                }`}
                onClick={() => api && api.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
