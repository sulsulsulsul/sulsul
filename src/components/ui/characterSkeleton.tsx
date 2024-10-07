import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

function VerticalLinearStepperSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div className="mb-[70px] mt-[40px] flex justify-center">
        <Skeleton className="inline-block size-[120px] rounded-full" />
      </div>
      <div className="mb-[50px] flex items-center space-x-0 overflow-visible">
        <div className="space-y-1">
          <Skeleton className="inline-block size-[24px] rounded-full" />
          <Skeleton className="relative left-[5px] inline-block h-[24px] w-[92px]" />
          <Skeleton className="relative h-[24px] w-[245px]" />
        </div>
      </div>
      <div className="mb-[50px] flex items-center space-x-0 overflow-visible">
        <div className="space-y-1">
          <Skeleton className="inline-block size-[24px] rounded-full" />
          <Skeleton className="relative left-[5px] inline-block h-[24px] w-[92px]" />
          <Skeleton className="relative h-[24px] w-[245px]" />
        </div>
      </div>
      <div className="mb-[82px] flex items-center space-x-0  overflow-visible">
        <div className="space-y-1">
          <Skeleton className="inline-block size-[24px] rounded-full" />
          <Skeleton className="relative left-[5px] inline-block h-[24px] w-[92px]" />
          <Skeleton className="relative h-[24px] w-[245px]" />
        </div>
      </div>
    </>
  );
}

export { VerticalLinearStepperSkeleton };
