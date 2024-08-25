'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
export default function Challenge() {
  const [currentImage, setCurrentImage] = useState(0);
  const MaxLoop = 4;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const intervalRef = setInterval(() => {
        setCurrentImage((prev) => {
          return prev >= MaxLoop ? 0 : (prev += 1);
        });
      }, 1200);
      return () => clearInterval(intervalRef);
    }
  }, [isInView]);
  console.log(isInView);

  return (
    <div
      className="relative flex w-full flex-col items-center bg-blue-100 text-4xl font-bold text-blue-500 lg:text-6xl"
      ref={ref}
    >
      <div className="mt-[50px] lg:mt-[100px] ">백문백답 챌린지로</div>
      <div>단골 기출문제 완벽 대비</div>
      <Button className="mt-8 px-4 text-base font-semibold lg:px-12 lg:text-lg">
        면접 기출문제 풀기
      </Button>
      <div className="invisible absolute bottom-[120px] flex flex-row gap-[524px] lg:visible ">
        <div className="flex flex-row gap-[18px]">
          <Image
            src={
              currentImage === 0
                ? '/images/Lv.2-color.svg'
                : '/images/Lv.2-gray.svg'
            }
            width={160}
            height={160}
            alt="level-icon"
          />
          <Image
            src={
              currentImage === 1
                ? '/images/Lv.3-color.svg'
                : '/images/Lv.3-gray.svg'
            }
            width={160}
            height={160}
            alt="level-icon"
          />
        </div>
        <div className="flex flex-row  gap-[18px]">
          <Image
            src={
              currentImage === 2
                ? '/images/Lv.5-color.svg'
                : '/images/Lv.5-gray.svg'
            }
            width={160}
            height={160}
            alt="level-icon"
          />
          <Image
            src={
              currentImage === 3
                ? '/images/Lv.6-color.svg'
                : '/images/Lv.6-gray.svg'
            }
            width={160}
            height={160}
            alt="level-icon"
          />
        </div>
      </div>
      <Image
        className="z-20  mt-[36px] lg:mt-[60px]"
        src="/images/challenge-section.svg"
        width={582}
        height={522}
        alt="challenge-seciton"
      ></Image>
    </div>
  );
}
