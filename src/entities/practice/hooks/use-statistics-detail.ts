import { useQuery } from '@tanstack/react-query';

export const getQueryKey = (period: number) => ['statistics-detail', period];
