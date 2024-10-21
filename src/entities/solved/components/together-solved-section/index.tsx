'use client';

import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useInterview } from '../../hooks/use-get-interview';
import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { TogetherSolvedSectionSkeleton } from '../../skeletons/together-solved-section-skeleton';
import { AnswerCompleteSection } from '../answer-complete-section';
import { NoAnswerCompleteSection } from '../no-answer-complete-section';
import { TogetherSolvedHeader } from '../together-solved-header';

export const TogetherSolvedSection = ({ pivotDate }: { pivotDate: string }) => {
  const { auth } = useUserStore();
  const { userId, accessToken } = auth;

  const { data: currentInterviewData, isLoading: isLoadingInterviewData } =
    useInterview(pivotDate);

  const { data: myWriteAnswerData, isLoading: isLoadingUserAnswerData } =
    useUserAnswer({
      interviewId: currentInterviewData?.weeklyInterviewId || 0,
      userId,
      accessToken,
    });

  const IsLoadingState = isLoadingInterviewData || isLoadingUserAnswerData;
  return (
    <>
      <section className="flex flex-col gap-2">
        <TogetherSolvedHeader />
        <div
          className={cn(
            `flex min-h-[520px] w-full flex-col justify-center rounded-md border border-gray-200 bg-white p-[50px] shadow-base`,
            myWriteAnswerData ? 'gap-6' : 'gap-5 items-center',
          )}
        >
          {IsLoadingState ? (
            <TogetherSolvedSectionSkeleton />
          ) : myWriteAnswerData && accessToken ? (
            <AnswerCompleteSection myWriteAnswerData={myWriteAnswerData} />
          ) : (
            <NoAnswerCompleteSection />
          )}
        </div>
      </section>
    </>
  );
};
