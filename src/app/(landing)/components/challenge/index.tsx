'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
export default function Challenge() {
  const [currentImage, setCurrentImage] = useState(0);
  const MaxLoop = 4;
  const ref = useRef(null);
  const myElementRef = useRef(null); // 감시할 요소를 참조하기 위한 useRef
  const [isInView, setIsInView] = useState(false); // 요소가 화면에 보이는지 상태로 관리

  useEffect(() => {
    // IntersectionObserver의 콜백 함수
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting); // 요소가 화면에 보이면 상태를 true로 업데이트
      });
    };
    // IntersectionObserver 인스턴스를 생성
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // 뷰포트를 기준으로 함
      rootMargin: '0px',
      threshold: 0.1, // 요소의 10%가 화면에 보일 때 콜백을 실행
    });
    if (ref.current) {
      observer.observe(ref.current); // 요소를 관찰 시작
    }
    // 클린업 함수: 컴포넌트가 언마운트될 때 observer를 해제
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // 빈 배열을 사용해 컴포넌트가 처음 마운트될 때만 실행

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCurrentImage((prev) => {
        return prev >= MaxLoop ? 0 : (prev += 1);
      });
      console.log(isInView);
    }, 500);
    if (!isInView) {
      return () => clearInterval(intervalRef);
    }
  }, []);

  return (
    <div
      className="relative flex w-full flex-col items-center bg-blue-100 text-6xl font-bold text-blue-500"
      ref={ref}
    >
      <div className="mt-[100px]">백문백답 챌린지로</div>
      <div>단골 기출문제 완벽 대비</div>
      <Button size="default" className="mt-8">
        면접 기출문제 풀기
      </Button>
      <div className="absolute bottom-[120px] flex flex-row gap-[524px]">
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
        className="z-20  mt-[60px]"
        src="/images/challenge-section.svg"
        width={582}
        height={522}
        alt="challenge-seciton"
      ></Image>
    </div>
  );
}
