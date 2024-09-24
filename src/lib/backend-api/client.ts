/* eslint-disable no-console */

import axios from 'axios';

import { APP_ENV } from '@/config/env';

import { assertAccessToken } from '../utils';
import { ApiEndpoint } from './api-end-point';
import { Response } from './type';

function makeAxiosInstance() {
  const instance = axios.create({
    baseURL: APP_ENV.backendUrl(),
    timeout: 1000 * 12,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      // console.log('🔺 Request:', {
      //   ...config,
      //   headers: { ...config.headers },
      // });
      return config;
    },
    (error) => {
      // Do something with request error
      // console.error('❌ Request Error:', error);
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // console.log('🔻 Response', {
      //   config: response.config,
      //   data: response.data,
      // });
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        // Server responded with a status other than 2xx
        //   console.error('⚠️ Response Error:', error.response);
      } else if (error.request) {
        // Request was made but no response was received
        //    console.error('🔌 No Response:', error.request);
      } else {
        // Something happened in setting up the request
        //   console.error('🚨 Error:', error.message);
      }
      // refresh token을 적용할 순 있지만 session을 업데이트하진 못함
      // const originalRequest = error.config;
      // console.log('originalRequest==>', originalRequest);
      // if (error.response?.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;
      //   console.log('401 Error, attempting to refresh token');

      //   try {
      //     const session = await auth();
      //     if (!session || !session.user) {
      //       throw new Error('No active session');
      //     }

      //     const refreshedToken = await refreshAccessToken(session.user);
      //     console.log('refreshedToken=>', refreshedToken);
      //     if (refreshedToken && !refreshedToken.error) {
      //       // 새로운 토큰으로 원래 요청 재시도
      //       originalRequest.headers['Authorization'] =
      //         `Bearer ${refreshedToken.accessToken}`;

      //       if (typeof window === 'undefined') {
      //         const updatedSession = await auth();
      //         if (updatedSession) {
      //           console.log(updatedSession);
      //         }
      //       }
      //       return instance(originalRequest);
      //     } else {
      //       throw new Error('Failed to refresh token');
      //     }
      //   } catch (refreshError) {
      //     console.error('Error during token refresh:', refreshError);
      //     return Promise.reject(refreshError);
      //   }
      // }

      return Promise.reject(error);
    },
  );

  return instance;
}

export interface BackendApiParams {
  endpoint: ApiEndpoint;
  data?: Record<string, unknown>;
  params?: any;
  accessToken?: string;
}

export const backendApi = async <T>({
  endpoint,
  data,
  params,
  accessToken,
}: BackendApiParams) => {
  const axiosInstance = makeAxiosInstance();
  const { url, method, authorization } = endpoint;

  try {
    if (authorization) {
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken ?? (await assertAccessToken())}`;
    }

    const res = (await axiosInstance({
      url,
      method,
      data,
      params,
    })) as { data: Response<T> };

    return res.data.data;
  } catch (error) {
    console.error('Axios request error:', error);
  }
};
