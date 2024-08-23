'use client';
import { HTMLAttributes, useState } from 'react';

import MyPracticeStatus from '@/entities/practice/components/my-practice-status';
import PracticeQuestions from '@/entities/practice/components/practice-questions';
import { PracticeResultCard } from '@/entities/practice/components/practice-result-card';
import { PracticeStartCard } from '@/entities/practice/components/practice-start-card';
import useStatisticsSummary from '@/entities/practice/hooks/use-statistics-summary';
import PracticeSelection from '@/entities/practice-list-modal';
import useSearchQuestions from '@/entities/questions/hooks/use-search-questions';
import { cn } from '@/lib/utils';
interface PracticeProps extends HTMLAttributes<HTMLDivElement> {
  userId: number;
}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4308-9475&t=OZrGkP4ZgEF84mEl-1
 */
const Practice = ({ className, userId }: PracticeProps) => {
  const { data: statisticsSummary, isSuccess: isSuccessStatisticsSummary } =
    useStatisticsSummary({
      userId,
    });
  const { data: hintUsedQuestions, isSuccess: isSuccessHintQuestions } =
    useSearchQuestions({
      params: { userId, hint: true },
    });
  const { data: favoriteQuestions, isSuccess: isSuccessFavoriteQuestions } =
    useSearchQuestions({
      params: { userId, star: true },
    });
  const { data: unansweredQuestions, isSuccess: isSuccessNotAnswerQuestions } =
    useSearchQuestions({
      params: { userId, practiceStatus: 'NOT_ANSWER' },
    });

  const [openModal, setOpenModal] = useState(false);

  if (
    !isSuccessStatisticsSummary ||
    !isSuccessHintQuestions ||
    !isSuccessFavoriteQuestions ||
    !isSuccessNotAnswerQuestions
  ) {
    // TODO: loading 처리
    return null;
  }

  return (
    <main className={cn(className)}>
      <section className={cn('flex gap-[25px]')}>
        <PracticeStartCard
          setModalOpen={setOpenModal}
          className={cn(
            'flex h-[273px] min-w-[282px] flex-col items-center justify-between',
          )}
          nickname="수리수리"
        />
        {openModal && <PracticeSelection setModal={setOpenModal} />}
        <PracticeResultCard type="good" value={statisticsSummary.answerCount} />
        <PracticeResultCard
          type="time"
          value={statisticsSummary.notAnswerCount}
        />
        <PracticeResultCard
          type="bad"
          value={statisticsSummary.totalPracticeTime}
        />
      </section>
      <section className="mt-[80px] grid grid-cols-2 gap-6">
        <PracticeQuestions
          favoriteQuestions={favoriteQuestions}
          hintUsedQuestions={hintUsedQuestions}
          unansweredQuestions={unansweredQuestions}
        />
        <MyPracticeStatus />
      </section>
    </main>
  );
};

export default Practice;
