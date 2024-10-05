'use client';
import { useEffect } from 'react';

import { InterviewData } from '@/entities/types/interview';
import { useUserStore } from '@/store/client';
import { useInterviewStore } from '@/store/interviewStore';

import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { AnswerCompleteSection } from '../answer-complete-section';
import { NoAnswerCompleteSection } from '../no-answer-complete-section';

export const TogetherSolvedSection = ({
  currentInterviewData,
  refetch,
}: {
  currentInterviewData: InterviewData;
  refetch: () => void;
}) => {
  const { auth } = useUserStore();
  const { userId, accessToken } = auth;

  const { data: myWriteAnswerData, isSuccess: isSuccessMyWriteAnswerData } =
    useUserAnswer({
      interviewId: currentInterviewData?.weeklyInterviewId,
      userId,
      accessToken,
    });
  const { setInterviewData } = useInterviewStore();

  useEffect(() => {
    if (currentInterviewData) {
      setInterviewData(currentInterviewData, refetch);
    }
  }, [currentInterviewData]);

  if (!isSuccessMyWriteAnswerData) {
    return null;
  }
  return (
    <>
      {myWriteAnswerData ? (
        <AnswerCompleteSection myWriteAnswerData={myWriteAnswerData} />
      ) : (
        <NoAnswerCompleteSection />
      )}
    </>
  );
};
