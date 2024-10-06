'use server';

import { DonationRankDTO } from '@/entities/types/donation';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getRankingAction = () => {
  return backendApi<DonationRankDTO[]>({
    endpoint: API_ENDPOINT.donation.getRanking(),
  });
};
