import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { UserDTO } from '../types';

export interface GetUserActionParams {
  userId: number;
  accessToken?: string;
}

export const getUserAction = async ({
  userId,
  accessToken,
}: GetUserActionParams) => {
  return backendApi<UserDTO>({
    endpoint: API_ENDPOINT.user.getUser(userId),
    accessToken,
  });
};
