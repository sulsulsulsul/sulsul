import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import getStatisticsDetailAction from '@/entities/practice/actions/get-statistics-detail-action';
import getStatisticsSummaryAction from '@/entities/practice/actions/get-statistics-summary-action';
import { getQueryKey as getStatisticsDetailQueryKey } from '@/entities/practice/hooks/use-statistics-detail';
import { getQueryKey as getStatisticsSummaryQueryKey } from '@/entities/practice/hooks/use-statistics-summary';
import getSearchQuestionsAction from '@/entities/questions/actions/get-search-questions-action';
import { getQueryKey as getSearchQuestionsQueryKey } from '@/entities/questions/hooks/use-search-questions';
import { getQueryClient } from '@/lib/tanstack-query/client';
import Practice from '@/views/practice';

const Page = async () => {
  const queryClient = getQueryClient();
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;

  // TODO: prefetch 깔끔하게 정리 생각해보기
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: getStatisticsSummaryQueryKey(userId),
      queryFn: () => getStatisticsSummaryAction(userId),
    }),
    // TODO: 월 데이터도 캐싱
    queryClient.prefetchQuery({
      queryKey: getStatisticsDetailQueryKey({
        period: 'WEEKLY',
        userId,
      }),
      queryFn: () =>
        getStatisticsDetailAction({
          period: 'WEEKLY',
          userId,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: getSearchQuestionsQueryKey({
        userId,
        practiceStatus: 'NOT_ANSWER',
      }),
      queryFn: () =>
        getSearchQuestionsAction({ userId, practiceStatus: 'NOT_ANSWER' }),
    }),
    queryClient.prefetchQuery({
      queryKey: getSearchQuestionsQueryKey({ userId, hint: true }),
      queryFn: () => getSearchQuestionsAction({ userId, hint: true }),
    }),
    queryClient.prefetchQuery({
      queryKey: getSearchQuestionsQueryKey({ userId, star: true }),
      queryFn: () => getSearchQuestionsAction({ userId, star: true }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Practice userId={userId} />
    </HydrationBoundary>
  );
};

export default Page;
