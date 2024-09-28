import { queryOptions } from '@tanstack/react-query';

import { getUserChallengesProgress } from '@/app/(routes)/solved/question/actions/get-user-challenges-progress';
import { getUserQuestionList } from '@/app/(routes)/solved/question/actions/get-user-question-list';
import { getUserActivityAction } from '@/entities/solved/actions';
import { getInterviewAction } from '@/entities/solved/actions/get-interview-action';

export const myActivityOptions = (userId: number, accessToken: string) => {
  return queryOptions({
    queryKey: ['interview', userId, accessToken],
    queryFn: () => {
      return getUserActivityAction({ userId, accessToken });
    },
    enabled: !!accessToken && !!userId,
  });
};

export const interviewOptions = (pivotDate: string) => {
  return queryOptions({
    queryKey: ['interview', pivotDate],
    queryFn: () => {
      return getInterviewAction(pivotDate);
    },
  });
};

export const interviewPrevOptions = (pivotDate: string) => {
  return queryOptions({
    queryKey: ['interview', 'prevDate', pivotDate],
    queryFn: () => {
      return getInterviewAction(pivotDate);
    },
  });
};

// 백문백답 상세 - 답변작성률 - 연정
export const myChallengesProgressOptions = (accessToken: string) => {
  return queryOptions({
    queryKey: ['challenge', 'progress', accessToken],
    queryFn: () => {
      return getUserChallengesProgress(accessToken);
    },
  });
};

// 백문백답 상세 - 최다 빈출 기본질문 10
export const myQuestionListOptions = (
  accessToken: string,
  category: string,
) => {
  return queryOptions({
    queryKey: ['challenge', 'questionList', category, accessToken],
    queryFn: () => {
      return getUserQuestionList({ accessToken, category });
    },
  });
};
