import { Method, OAuthType } from './type'

export type ApiEndpoint = {
  url: string
  method: Method
  authorization: boolean
}

export const API_ENDPOINT = {
  auth: {
    signIn: (oauthType: OAuthType) => {
      return {
        url: `/public/api/v1/auth/login/${oauthType}`,
        method: Method.POST,
        authorization: false,
      }
    },
  },
  user: {
    getUser: (id: number) => {
      return {
        url: `/api/v1/users/${id}`,
        method: Method.GET,
        authorization: true,
      }
    },
    updateUserJob: (userId: number, jobId: number) => {
      return {
        url: `/api/v1/users/${userId}/jobs/${jobId}`,
        method: Method.PATCH,
        authorization: true,
      }
    },
    updateUserNickname: (id: number) => {
      return {
        url: `/api/v1/users/${id}/nickname`,
        method: Method.PATCH,
        authorization: true,
      }
    },
  },
  archive: {
    getArchives: () => {
      return {
        url: `/api/v1/archives`,
        method: Method.GET,
        authorization: true,
      }
    },
    getArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.GET,
        authorization: true,
      }
    },
    createArchive: () => {
      return {
        url: `/api/v1/archives`,
        method: Method.POST,
        authorization: true,
      }
    },
    updateArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.PUT,
        authorization: true,
      }
    },
    deleteArchive: (id: number) => {
      return {
        url: `/api/v1/archives/${id}`,
        method: Method.DELETE,
        authorization: true,
      }
    },
  },
  feedback: {
    getFeedback: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/feedback`,
        method: Method.GET,
        authorization: true,
      }
    },

    createFeedback: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/feedback`,
        method: Method.POST,
        authorization: true,
      }
    },
  },
  keyword: {
    getKeywords: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/keywords`,
        method: Method.GET,
        authorization: true,
      }
    },
    createKeyword: (questionId: number) => {
      return {
        url: `/api/v1/questions/${questionId}/keywords`,
        method: Method.POST,
        authorization: true,
      }
    },

    deleteKeyword: ({ questionId, id }: { questionId: number; id: number }) => {
      return {
        url: `/api/v1/questions/${questionId}/keywords/${id}`,
        method: Method.DELETE,
        authorization: true,
      }
    },
  },
} as const
