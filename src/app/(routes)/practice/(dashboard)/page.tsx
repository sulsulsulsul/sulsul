import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import getStatisticsSummaryAction from '@/entities/practice/actions/get-statistics-summary-action';
import { getQueryKey } from '@/entities/practice/hooks/use-statistics-summary';
import { getQueryClient } from '@/lib/tanstack-query/client';
import Dashboard from '@/views/dashboard';

const Page = async () => {
  const queryClient = getQueryClient();
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;

  await queryClient.prefetchQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => getStatisticsSummaryAction(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard userId={userId} />
    </HydrationBoundary>
  );
};

export default Page;
