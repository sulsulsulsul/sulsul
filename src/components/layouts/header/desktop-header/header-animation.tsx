'use client';

import { HTMLAttributes, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { cn } from '@/lib/utils';
interface HeaderAnimationProps extends HTMLAttributes<HTMLDivElement> {}

gsap.registerPlugin(ScrollTrigger);

// 랜딩페이지에서만 헤더 애니메이션을 적용합니다.
export const HeaderAnimation = ({
  className,
  children,
  ...props
}: HeaderAnimationProps) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current === null) return;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: '0px start',
      end: 'bottom start',
      animation: gsap.to(containerRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }),
      toggleActions: 'play none none reverse',
    });
  }, [pathname]);

  if (pathname !== '/') {
    return <div className="border-b">{children}</div>;
  }

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
};
