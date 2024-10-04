'use server';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getPrefecthList } from '@/entities/practice/practice-list/actions/get-prefetch-action';
import { PracticeHistory } from '@/views/practice-history';

const Page = async () => {
  const queryClient = new QueryClient();
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;
  await queryClient.prefetchQuery({
    queryKey: ['practiceCount', userId],
    queryFn: () => getPrefecthList(userId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PracticeHistory />
    </HydrationBoundary>
  );
};

export default Page;
