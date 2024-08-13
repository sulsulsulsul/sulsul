import { HTMLAttributes } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface PendingInterviewQuestionProps
  extends HTMLAttributes<HTMLDivElement> {}
export function PendingStatus({ className }: PendingInterviewQuestionProps) {
  return (
    <div className="flex flex-col">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="mb-2 h-[65px] w-full bg-gray-100" />
        ))}
    </div>
  );
}
