import { HTMLAttributes } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface PendingInterviewQuestionProps
  extends HTMLAttributes<HTMLDivElement> {}
export function PendingStatus({ className }: PendingInterviewQuestionProps) {
  return (
    <div className="flex flex-col">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="mb-3 h-[70px] w-full bg-gray-100" />
        ))}
    </div>
  );
}
