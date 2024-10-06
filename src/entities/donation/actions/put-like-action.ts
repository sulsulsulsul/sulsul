'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const putLikeAction = (donationNo: number) => {
  return backendApi({
    endpoint: API_ENDPOINT.donation.putDonationLike(donationNo),
  });
};
