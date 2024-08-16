import { Method, OAuthType } from './type';

export type ApiEndpoint = {
  url: string;
  method: Method;
  authorization: boolean;
};

export const API_ENDPOINT = {
  auth: {
    signIn: (oauthType: OAuthType) => {
      return {
        url: `/public/api/v1/auth/login/${oauthType}`,
        method: Method.POST,
        authorization: false,
      };
    },
  },
  user: {
    getUser: (id: number) => {
      return {
        url: `/api/v1/users/${id}`,
        method: Method.GET,
        authorization: true,
      };
    },
    updateUserJob: (userId: number, jobId: number) => {
      return {
        url: `/api/v1/users/${userId}/jobs/${jobId}`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateUserNickname: (id: number) => {
      return {
        url: `/api/v1/users/${id}/nickname`,
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
    getArchives: (page: number) => {
      return {
        url: `/api/v1/archives?page=${page}`,
        method: Method.GET,
        authorization: true,
      };
    },
    getArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.GET,
        authorization: true,
      };
    },
    createArchive: () => {
      return {
        url: `/api/v1/archives`,
        method: Method.POST,
        authorization: true,
      };
    },
    updateArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.PUT,
        authorization: true,
      };
    },
    deleteArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
  },
  feedback: {
    getFeedback: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/feedback`,
        method: Method.GET,
        authorization: true,
      };
    },

    createFeedback: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/feedback`,
        method: Method.POST,
        authorization: true,
      };
    },
  },
  keyword: {
    getKeywords: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/keywords`,
        method: Method.GET,
        authorization: true,
      };
    },
    createKeyword: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/keywords`,
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
        url: `/api/v1/questions/${questionId}/keywords/${keywordId}`,
        method: Method.DELETE,
        authorization: true,
      };
    },
  },
  question: {
    createQuestions: (archiveId: number) => {
      return {
        url: `/api/v1/questions/${archiveId}/ai`,
        method: Method.POST,
        authorization: true,
      };
    },
    updateAnswer: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/answers`,
        method: Method.PATCH,
        authorization: true,
      };
    },
  },
  practice: {
    createPractice: () => {
      return {
        url: `/api/v1/practice`,
        method: Method.POST,
        authorization: true,
      };
    },
    updatePractice: () => {
      return {
        url: `/api/v1/practice/question-status`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateTime: (practiceId: number) => {
      return {
        url: `/api/v1/practice/${practiceId}/time`,
        method: Method.PATCH,
        authorization: true,
      };
    },
    updateHintUsage: () => {
      return {
        url: `/api/v1/practice/question-hint`,
        method: Method.PATCH,
        authorization: true,
      };
    },
  },
} as const;
