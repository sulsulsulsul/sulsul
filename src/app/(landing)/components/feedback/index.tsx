import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
interface FeedbackProps extends HTMLAttributes<HTMLDivElement> {}

export const Feedback = ({ className, ...props }: FeedbackProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center h-[296px] mobile:h-[185px]',
        className,
      )}
      {...props}
    >
      <div className="relative z-20 text-center text-white">
        <p className="text-4xl font-bold sm:text-6xl">술술, 이용해보셨나요?</p>
        <p className="mt-2 text-xl sm:text-3xl">
          피드백을 남기고 커피 쿠폰 받기
        </p>
      </div>
      <Image
        src="/images/feedback.svg"
        layout="fill"
        objectFit="cover"
        priority
        alt="feedback-bg"
      />
    </div>
  );
};
