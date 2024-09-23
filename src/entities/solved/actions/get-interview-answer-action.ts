'use server';

import {
  AnswerListData,
  InterviewData,
  MyActivityData,
} from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

interface InterviewAnswerActionProps {
  interviewId: number;
  userId: number;
}
export const getUserAnswerAction = ({
  interviewId,
  userId,
}: InterviewAnswerActionProps): Promise<AnswerListData> => {
  return backendApi<AnswerListData>({
    endpoint: API_ENDPOINT.interview.getInterviewsAnswer(interviewId, userId),
  });
};
