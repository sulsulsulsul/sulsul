'use client';
import { HTMLAttributes, useState } from 'react';

import MyPracticeStatus from '@/entities/dashboard/components/my-practice-status';
import PracticeQuestions from '@/entities/dashboard/components/practice-questions';
import { PracticeResultCard } from '@/entities/dashboard/components/practice-result-card';
import { PracticeStartCard } from '@/entities/dashboard/components/practice-start-card';
import PracticeSelection from '@/entities/practice/practice-modal';
import { cn } from '@/lib/utils';
interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4308-9475&t=OZrGkP4ZgEF84mEl-1
 */
export const Dashboard = ({ className, ...props }: DashboardProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <main className={cn(className)} {...props}>
      <section className={cn('flex gap-[25px]')}>
        <PracticeStartCard
          setModalOpen={setOpenModal}
          className={cn(
            'flex h-[273px] min-w-[282px] flex-col items-center justify-between',
          )}
          nickname="수리수리"
        />
        {openModal && <PracticeSelection setModal={setOpenModal} />}
        <PracticeResultCard type="good" value={10} />
        <PracticeResultCard type="time" value={10} />
        <PracticeResultCard type="bad" value={10} />
      </section>
      <section className="mt-[80px] grid grid-cols-2 gap-6">
        <PracticeQuestions />
        <MyPracticeStatus />
      </section>
    </main>
  );
};
