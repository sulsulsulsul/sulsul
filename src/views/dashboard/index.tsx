'use client';

import { HTMLAttributes } from 'react';

import MyPracticeStatus from '@/entities/practice/components/my-practice-status';
import PracticeQuestions from '@/entities/practice/components/practice-questions';
import { PracticeResultCard } from '@/entities/practice/components/practice-result-card';
import { PracticeStartCard } from '@/entities/practice/components/practice-start-card';
import useStatisticsSummary from '@/entities/practice/hooks/use-statistics-summary';
import { cn } from '@/lib/utils';
interface PracticeProps extends HTMLAttributes<HTMLDivElement> {
  userId: number;
}

const Dashboard = ({ userId, className }: PracticeProps) => {
  const { data: statisticsSummary } = useStatisticsSummary({ userId });

  if (!statisticsSummary) {
    // TODO: loading 처리
    return null;
  }

  return (
    <main className={cn(className)}>
      <section className={cn('flex gap-[25px]')}>
        <PracticeStartCard
          className={cn(
            'flex h-[273px] min-w-[282px] flex-col items-center justify-between',
          )}
          nickname="수리수리"
        />
        <PracticeResultCard
          type="good"
          value={statisticsSummary?.answerCount || 0}
        />
        <PracticeResultCard
          type="time"
          value={statisticsSummary?.notAnswerCount || 0}
        />
        <PracticeResultCard
          type="bad"
          value={statisticsSummary?.totalPracticeTime || 0}
        />
      </section>
      <section className="mt-[80px] grid grid-cols-2 gap-6">
        <PracticeQuestions />
        <MyPracticeStatus />
      </section>
    </main>
  );
};

export default Dashboard;
