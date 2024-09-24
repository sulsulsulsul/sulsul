'use server';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getPrefecthList } from '@/entities/practice/practice-list/actions/get-prefetch-action';
import { PracticeHistory } from '@/views/practice-history';

const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['practiceCount'],
    queryFn: () => getPrefecthList(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PracticeHistory />
    </HydrationBoundary>
  );
};

export default Page;
