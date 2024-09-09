import { HTMLAttributes } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getPrefecthList } from '@/entities/practice/practice-list/actions/get-prefetch-action';
import PracticeList from '@/entities/practice/practice-list/view';
import { cn } from '@/lib/utils';
interface PracticeHistoryProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4325-9343&t=OZrGkP4ZgEF84mEl-1
 */

export const PracticeHistory = ({
  className,
  ...props
}: PracticeHistoryProps) => {
  return <PracticeList />;
};
