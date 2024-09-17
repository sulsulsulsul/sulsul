import { AnswerList } from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerListActionProps {
  interviewId: number;
  sortType: 'NEW' | 'RECOMMEND';
}
export const getAnswerListAction = ({
  interviewId,
  sortType,
}: AnswerListActionProps) => {
  return backendApi({
    endpoint: API_ENDPOINT.interview.getSortedInterviewsAnswer({
      interviewId,
      sortType,
    }),
  });
};
