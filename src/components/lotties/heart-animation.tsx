'use client';
import dynamic from 'next/dynamic';
import { LottieComponentProps } from 'lottie-react';

import animationData from '@/components/lotties/assets/heart.json';
import { cn } from '@/lib/utils';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
interface HeartAnimationProps
  extends Omit<LottieComponentProps, 'animationData'> {}

export const HeartAnimation = ({
  className,
  ...props
}: HeartAnimationProps) => {
  return (
    <Lottie
      animationData={animationData}
      className={cn(className)}
      {...props}
    />
  );
};
