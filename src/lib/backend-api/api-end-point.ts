import { Method, OAuthType } from './type';

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
  },
  user: {
    getUser: (id: number) => {
      return {
        url: `${API_V1_BASE}/users/${id}`,
        method: Method.GET,
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
  },
  archive: {
    getArchives: () => {
      return {
        url: `${API_V1_BASE}/archives`,
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

    deleteKeyword: ({ questionId, id }: { questionId: number; id: number }) => {
      return {
        url: `${API_V1_BASE}/questions/${questionId}/keywords/${id}`,
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
  },
} as const;
