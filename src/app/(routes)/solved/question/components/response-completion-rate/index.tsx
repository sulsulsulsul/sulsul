'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import Character from './character';
import CompletionRate from './completion-rate';
import VerticalLinearStepper from './vertical-linear-stepper';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const ResponseCompletionRate = ({ className }: QuestionListProps) => {
  const { auth } = useUserStore();

  return (
    <div className={cn('h-full', className)}>
      <div className="mt-[18px] size-full rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <Character />
        <CompletionRate />
        <VerticalLinearStepper accessToken={auth.accessToken} />
      </div>
    </div>
  );
};

export default ResponseCompletionRate;
