import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      <Link href="https://forms.gle/NjyUxkFDokq2Gtus5" className="flex">
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white">
          <p className="text-4xl font-bold sm:text-6xl">
            술술, 이용해보셨나요?
          </p>
          <p className="mt-2 flex flex-row text-xl sm:text-3xl">
            피드백을 남기고 커피 쿠폰 받기{' '}
            <Image
              alt="icon"
              src="/images/icons/icon-arrow_up_right.svg"
              width={20}
              height={20}
            />
          </p>
        </div>
        <Image
          src="/images/feedback.png"
          objectFit="cover"
          fill
          priority
          alt="feedback-bg"
        />
      </Link>
    </div>
  );
};
