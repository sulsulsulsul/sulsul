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
      console.log('📤 Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
        headers: { ...config.headers },
      });
      return config;
    },
    (error) => {
      // Do something with request error
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('⚠️ Response Error:', error.response);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('🔌 No Response:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('🚨 Error:', error.message);
      }
      return Promise.reject(error);
    },
  );

  return instance; // Make sure to return the instance
}

export interface BackendApiParams {
  endpoint: ApiEndpoint;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  accessToken?: string;
}

export const backendApi = async <T>({
  endpoint,
  data,
  params,
  accessToken,
}: BackendApiParams) => {
  const axios = makeAxiosInstance();
  const { url, method, authorization } = endpoint;
  if (authorization) {
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken ?? (await assertAccessToken())}`;
  }

  const res = (await axios({
    url,
    method,
    data,
    params,
  })) as { data: Response<T> };

  return res.data.data;
};
