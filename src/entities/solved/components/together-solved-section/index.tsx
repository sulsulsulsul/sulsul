'use client';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useUserStore } from '@/store/client';

import { useInterview } from '../../hooks/use-get-interview';
import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { AnswerCompleteSection } from '../answer-complete-section';
import { NoAnswerCompleteSection } from '../no-answer-complete-section';

export const TogetherSolvedSection = () => {
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const { auth } = useUserStore();

  const userId = auth.userId;

  const { data: currentData, refetch } = useInterview(pivotDate);
  const { data: myWriteAnswerData } = useUserAnswer({
    interviewId: currentData?.weeklyInterviewId || 1,
    userId,
  });

  return (
    <div>
      {myWriteAnswerData ? (
        <AnswerCompleteSection />
      ) : (
        <NoAnswerCompleteSection />
      )}
    </div>
  );
};
