import type { Period } from '@/entities/practice/types';

import { Method, type OAuthType } from './type';

const API_V1_BASE = '/api/v1';

export type ApiEndpoint = {
  url: string;
  method: Method;
  authorization: boolean;
};

export const API_ENDPOINT = {
  auth: {
    signIn: (oauthType: OAuthType) => {
      return {
        url: `/public${API_V1_BASE}/auth/login/${oauthType}`,
        method: Method.POST,
        authorization: false,
      };
    },
    refreshAuth: () => {
      return {
        url: `/public${API_V1_BASE}/auth/token-refresh`,
        method: Method.POST,
        authorization: true,
      };
    },
  },
  user: {
    getUser: (id: number) => {
      return {
        url: `${API_V1_BASE}/users/${id}`,
        method: Method.GET,
        authorization: true,
      };
    },
    updateUserJob: (userId: number, jobId: number) => {
      return {
        url: `${API_V1_BASE}/users/${userId}/jobs/${jobId}`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateUserNickname: (id: number) => {
      return {
        url: `${API_V1_BASE}/users/${id}/nickname`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    withdrawUser: (id: number) => {
      return {
        url: `/api/v1/users/${id}/withdraw`,
        method: Method.PATCH,
        authorization: true,
      };
    },
  },
  archive: {
    getArchives: (page: number, sortType: 'asc' | 'desc') => {
      return {
        url: `${API_V1_BASE}/archives?page=${page}&direction=${sortType}`,
        method: Method.GET,
        authorization: true,
      };
    },
    getArchive: (id: number) => {
      return {
        url: `${API_V1_BASE}/archives/${id}`,
        method: Method.GET,
        authorization: true,
      };
    },
    createArchive: () => {
      return {
        url: `${API_V1_BASE}/archives`,
        method: Method.POST,
        authorization: true,
      };
    },
    updateArchive: (id: number) => {
      return {
        url: `${API_V1_BASE}/archives/${id}`,
        method: Method.PUT,
        authorization: true,
      };
    },
    deleteArchive: (id: number) => {
      return {
        url: `${API_V1_BASE}/archives/${id}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
  },
  feedback: {
    getFeedback: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/feedback`,
        method: Method.GET,
        authorization: true,
      };
    },

    createFeedback: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/feedback`,
        method: Method.POST,
        authorization: true,
      };
    },
  },
  keyword: {
    getKeywords: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/keywords`,
        method: Method.GET,
        authorization: true,
      };
    },
    createKeyword: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/keywords`,
        method: Method.POST,
        authorization: true,
      };
    },
    // 백문백답 - 키워드 생성
    createChallengeKeyword: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/challenges/${questionId}/keyword`,
        method: Method.POST,
        authorization: true,
      };
    },

    deleteKeyword: ({
      questionId,
      keywordId,
    }: {
      questionId: number;
      keywordId: number;
    }) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/keywords/${keywordId}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
  },
  question: {
    getQuestions: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}`,
        method: Method.GET,
        authorization: true,
      };
    },
    // TODO: 동일 API 정리 and authorization 미가입 자 처리문의
    getPracticeSearchQuestions: () => {
      return {
        url: `${API_V1_BASE}/questions/search`,
        method: Method.GET,
        authorization: true,
      };
    },
    getSearchQuestions: (query: string) => {
      return {
        url: `/api/v1/questions/search?${query}`,
        method: Method.GET,
        authorization: true,
      };
    },
    getAllSearchQuestions: (userId: number) => {
      return {
        url: `/api/v1/questions/search?userId=${userId}`,
        method: Method.GET,
        authorization: true,
      };
    },
    createQuestions: (archiveId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${archiveId}/ai`,
        method: Method.POST,
        authorization: true,
      };
    },
    createOwnQuestion: (archiveId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${archiveId}`,
        method: Method.POST,
        authorization: true,
      };
    },
    updateAnswer: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/answers`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateQuestion: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    deleteQuestion: (questionId: number) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
  },
  practice: {
    getStatisticsSummary: () => {
      return {
        url: `${API_V1_BASE}/practice/statistics/summary`,
        method: Method.GET,
        authorization: true,
      };
    },
    getStatisticsDetail: (period: Period) => {
      return {
        url: `${API_V1_BASE}/practice/statistics/detail/${period}`,
        method: Method.GET,
        authorization: true,
      };
    },
    createPractice: () => {
      return {
        url: `${API_V1_BASE}/practice`,
        method: Method.POST,
        authorization: true,
      };
    },
    createPracticeQuestion: (questionId: number) => {
      return {
        url: `/api/v1/practice/question/${questionId}`,
        method: Method.POST,
        authorization: true,
      };
    },
    updatePractice: () => {
      return {
        url: `${API_V1_BASE}/practice/question-status`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateTime: (practiceId: number) => {
      return {
        url: `${API_V1_BASE}/practice/${practiceId}/time`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateHintUsage: () => {
      return {
        url: `${API_V1_BASE}/practice/question-hint`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateStar: () => {
      return {
        url: `/api/v1/practice/question-star`,
        method: Method.PATCH,
        authorization: true,
      };
    },
  },
  interview: {
    createInterviewsAnswer: (interviewId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers`,
        method: Method.POST,
        authorization: true,
      };
    },
    deleteInterviewsAnswer: (interviewId: number, answerId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/${answerId}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
    updateInterviewsAnswer: (interviewId: number, answerId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/${answerId}`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    getInterviewsAnswer: (interviewId: number, userId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/${userId}`,
        method: Method.GET,
        authorization: true,
      };
    },
    getSortedInterviewsAnswer: ({
      interviewId,
      sortType,
    }: {
      interviewId: number;
      sortType: 'NEW' | 'RECOMMEND';
    }) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/sort/${sortType}`,
        method: Method.GET,
        authorization: true,
      };
    },
    createAnswerRecommend: (interviewId: number, answerId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/${answerId}/recommend`,
        method: Method.POST,
        authorization: true,
      };
    },
    deleteAnswerRecommend: (
      interviewId: number,
      answerId: number,
      userId: Number,
    ) => {
      return {
        url: `${API_V1_BASE}/interviews/${interviewId}/answers/${answerId}/recommend/${userId}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
    getInterview: () => {
      return {
        url: `${API_V1_BASE}/interviews`,
        method: Method.GET,
        authorization: false,
      };
    },
    getUserActivity: (userId: number) => {
      return {
        url: `${API_V1_BASE}/interviews/user-activities/${userId}`,
        method: Method.GET,
        authorization: true,
      };
    },
  },

  challenges: {
    // 백문백답 - 챌린지 진행상황
    getUserTotalChallengesProgress: () => {
      return {
        url: `${API_V1_BASE}/challenges/progress`,
        method: Method.GET,
        authorization: true,
      };
    },

    // 백문백답 상세 - 카테고리별 첼린지 진행 상황 조회
    getUserChallengesProgress: () => {
      return {
        url: `${API_V1_BASE}/challenges/progress/category`,
        method: Method.GET,
        authorization: true,
      };
    },

    // 백문백답 상세 - 카테고리별 첼린지 조회
    getUserQuestionList: (category: string) => {
      return {
        url: `${API_V1_BASE}/challenges/${category}`,
        method: Method.GET,
        authorization: true,
      };
    },

    // 최다 빈출 기본질문 - 저장하기
    createMostFrequentAnswer: (challengeId: number) => {
      return {
        url: `${API_V1_BASE}/challenges/${challengeId}/answer`,
        method: Method.POST,
        authorization: true,
      };
    },
  },
  donation: {
    getRanking: () => {
      return {
        url: `/public${API_V1_BASE}/donation/ranking?limit=5`,
        method: Method.GET,
        authorization: true,
      };
    },

    putDonationLike: (donationNo: number) => {
      return {
        url: `/public${API_V1_BASE}/donation/${donationNo}/like`,
        method: Method.PUT,
        authorization: true,
      };
    },
  },
} as const;
