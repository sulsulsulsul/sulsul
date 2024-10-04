import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import { getUserChallengesProgress } from '@/app/(routes)/solved/question/actions/get-user-challenges-progress';
import { getUserQuestionList } from '@/app/(routes)/solved/question/actions/get-user-question-list';
import { GetUserTotalChallengesProgress } from '@/app/(routes)/solved/question/actions/get-user-total-challenges-progress';
import { getUserActivityAction } from '@/entities/solved/actions';
import { getAnswerListAction } from '@/entities/solved/actions/get-answer-list-action';
import { getInterviewAction } from '@/entities/solved/actions/get-interview-action';
import { AnswerList } from '@/entities/types/interview';

export const myActivityOptions = (userId: number, accessToken: string) => {
  return queryOptions({
    queryKey: ['myActivity', userId, accessToken],
    queryFn: () => {
      return getUserActivityAction({ userId, accessToken });
    },
    enabled: !!accessToken && !!userId,
  });
};

export const interviewOptions = (pivotDate?: string) => {
  return queryOptions({
    queryKey: ['interview', pivotDate],
    queryFn: () => {
      return getInterviewAction(pivotDate);
    },
    placeholderData: keepPreviousData,
  });
};

export const answerListOptions = (
  interviewId: number,
  sortType: 'NEW' | 'RECOMMEND',
  accessToken?: string,
) => {
  return infiniteQueryOptions({
    queryKey: ['interview', interviewId, sortType, accessToken],
    queryFn: ({ pageParam = 0 }) => {
      return getAnswerListAction({
        interviewId,
        sortType,
        accessToken,
        pageParam: pageParam as number,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: AnswerList) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.totalPage ? nextPage : undefined;
    },
    placeholderData: keepPreviousData,
  });
};
// 벡믄벡딥 - 진행상황 - 상위 프로그래스
export const myTotalChallengesProgressOptions = (accessToken: string) => {
  return queryOptions({
    queryKey: ['challenge', 'totalProgress', accessToken],
    queryFn: () => {
      return GetUserTotalChallengesProgress(accessToken);
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
