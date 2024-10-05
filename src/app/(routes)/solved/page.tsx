import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import {
  interviewOptions,
  myActivityOptions,
} from '@/app/api/solved/query-options';
import { getQueryClient } from '@/lib/tanstack-query/client';
import { formatDate } from '@/shared/helpers/date-helpers';
import { Solved } from '@/views/solved';

const Page = async () => {
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;
  const accessToken = authInfo?.user.auth.accessToken || '';
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(interviewOptions(pivotDate)),
    queryClient.prefetchQuery(myActivityOptions(userId, accessToken)),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Solved accessToken={accessToken} userId={userId} />
    </HydrationBoundary>
  );
};
export default Page;
