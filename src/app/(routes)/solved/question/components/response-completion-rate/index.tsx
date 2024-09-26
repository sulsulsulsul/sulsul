'use client';

import { HTMLAttributes } from 'react';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { cn } from '@/lib/utils';

import Character from './character';
import CompletionRate from './completion-rate';
import VerticalLinearStepper from './vertical-linear-stepper';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const ResponseCompletionRate = async ({ className }: QuestionListProps) => {
  const authInfo = await auth();
  const accessToken = authInfo?.user.auth.accessToken || '';
  console.log('accessToken', authInfo);

  return (
    <div className={cn('h-full', className)}>
      <div className="mt-[18px] size-full rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <Character />
        <CompletionRate />
        <VerticalLinearStepper accessToken={accessToken} />
      </div>
    </div>
  );
};

export default ResponseCompletionRate;
