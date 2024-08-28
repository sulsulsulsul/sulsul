'use client';

import { HTMLAttributes, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface ScrollUpButtonProps extends HTMLAttributes<HTMLDivElement> {}
export const ScrollUpButton = ({
  className,
  ...props
}: ScrollUpButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useGSAP(() => {
    const vh = (value: number) => window.innerHeight * (value / 100);

    const tl = gsap.timeline({ paused: true });
    tl.from(buttonRef.current, {
      y: 50,
      autoAlpha: 0,
    });

    ScrollTrigger.create({
      start: `${vh(100)} top`,
      end: `${vh(100)} top`,
      animation: tl,
      toggleActions: 'play none none reverse',
    });
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn(className)} {...props}>
      <Button
        onClick={handleClick}
        className="invisible size-[52px] rounded-full p-0 shadow-md"
        ref={buttonRef}
      >
        <ChevronUp size={24} />
      </Button>
    </div>
  );
};
