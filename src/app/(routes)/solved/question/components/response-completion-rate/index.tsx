'use client';

import { HTMLAttributes } from 'react';

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

  return (
    <div className={cn('h-full', className)}>
      <div className="mt-[18px] size-full rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        {data && <Character data={data} />}
        <CompletionRate />
        {data && <VerticalLinearStepper data={data} />}
      </div>
    </div>
  );
};

export default ResponseCompletionRate;
