import { HTMLAttributes } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getPrefecthList } from '@/entities/practice/practice-list/actions/getPrefetch';
import PracticeList from '@/entities/practice/practice-list/view';
import { cn } from '@/lib/utils';
interface PracticeHistoryProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4325-9343&t=OZrGkP4ZgEF84mEl-1
 */

export const PracticeHistory = async ({
  className,
  ...props
}: PracticeHistoryProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['practiceCount'],
    queryFn: () => getPrefecthList(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PracticeList />
    </HydrationBoundary>
  );
};
