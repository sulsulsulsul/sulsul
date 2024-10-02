'use client';
import { HTMLAttributes, useState } from 'react';

import MyPracticeStatus from '@/entities/practice/components/my-practice-status';
import PracticeQuestions from '@/entities/practice/components/practice-questions';
import { PracticeResultCard } from '@/entities/practice/components/practice-result-card';
import { PracticeStartCard } from '@/entities/practice/components/practice-start-card';
import useStatisticsSummary from '@/entities/practice/hooks/use-statistics-summary';
import PracticeSelection from '@/entities/practice/practice-modal';
import useSearchQuestions from '@/entities/questions/hooks/use-search-questions';
import { cn } from '@/lib/utils';
interface PracticeProps extends HTMLAttributes<HTMLDivElement> {
  userId: number;
  nickname: string;
  isDesktop?: boolean;
}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4308-9475&t=OZrGkP4ZgEF84mEl-1
 */
const Practice = ({
  className,
  userId,
  nickname,
  isDesktop,
}: PracticeProps) => {
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
    return null;
  }

  return (
    <main className={cn('mobile:px-[16px]', className)}>
      <section className="flex gap-[25px] mobile:flex-col">
        <PracticeStartCard
          className="flex h-[273px] min-w-[282px] flex-col items-center justify-between"
          setModalOpen={setOpenModal}
          nickname={nickname}
        />
        <div className="flex w-full gap-[25px] overflow-x-auto mobile:flex-auto mobile:gap-[8px]">
          <PracticeResultCard
            type="good"
            value={statisticsSummary.answerCount}
          />
          <PracticeResultCard
            type="bad"
            value={statisticsSummary.notAnswerCount}
          />
          <PracticeResultCard
            type="time"
            value={statisticsSummary.totalPracticeTime}
          />
        </div>

        {openModal && <PracticeSelection setModal={setOpenModal} />}
      </section>
      <section className="mt-[80px] grid gap-6 mobile:mt-[42px] mobile:grid-cols-1 mobile:gap-10 desktop:grid-cols-2">
        <PracticeQuestions
          favoriteQuestions={favoriteQuestions}
          hintUsedQuestions={hintUsedQuestions}
          unansweredQuestions={unansweredQuestions}
          isDesktop={isDesktop}
        />
        <MyPracticeStatus userId={userId} />
      </section>
    </main>
  );
};

export default Practice;
