'use client';

import { HTMLAttributes, useEffect, useState } from 'react';

import { VerticalLinearStepperSkeleton } from '@/components/ui/characterSkeleton';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useUserChallengesProgress } from '../../hook/use-user-challenges-progress';
import Character from './character';
import CompletionRate from './completion-rate';
import VerticalLinearStepper from './vertical-linear-stepper';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const ResponseCompletionRate = ({ className }: QuestionListProps) => {
  const { auth } = useUserStore();
  const { data } = useUserChallengesProgress({
    accessToken: auth.accessToken,
  });
  // 스크롤 고정
  const [isSticky, setIsSticky] = useState(false);
  // 스켈레톤 상태
  const [isSkeleton, setIsSkeleton] = useState(false);

  useEffect(() => {
    if (data === undefined) {
      setIsSkeleton(true);
    } else {
      setIsSkeleton(false);
    }
  }, [data]);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={cn('h-full', className)}>
      <div
        className={`mt-[16px] size-full h-auto rounded-md border border-gray-200 bg-white p-[28px] shadow-base ${
          isSticky ? 'fixed top-[10px] z-10' : ''
        }`}
        style={{
          width: isSticky ? 'inherit' : '100%',
          maxWidth: '100%',
        }}
      >
        {data ? (
          <>
            <Character data={data} />
            <CompletionRate />
            <VerticalLinearStepper data={data} />
          </>
        ) : (
          <VerticalLinearStepperSkeleton />
        )}
      </div>
    </div>
  );
};

export default ResponseCompletionRate;
