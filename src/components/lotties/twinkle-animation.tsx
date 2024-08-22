'use client';

import dynamic from 'next/dynamic';
import { LottieComponentProps } from 'lottie-react';

import animationData from '@/components/lotties/assets/twinkle.json';
import { cn } from '@/lib/utils';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
interface TwinkleAnimationProps
  extends Omit<LottieComponentProps, 'animationData'> {}

export const TwinkleAnimation = ({
  className,
  ...props
}: TwinkleAnimationProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  );
};
