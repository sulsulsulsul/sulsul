'use server';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getPrefecthList } from '@/entities/practice/practice-list/actions/get-prefetch-action';
import { useUserStore } from '@/store/client';
import { PracticeHistory } from '@/views/practice-history';

const Page = async () => {
  const queryClient = new QueryClient();
  const { auth } = useUserStore();
  await queryClient.prefetchQuery({
    queryKey: ['practiceCount', auth.userId],
    queryFn: () => getPrefecthList(auth.userId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PracticeHistory />
    </HydrationBoundary>
  );
};

export default Page;
