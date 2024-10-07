import { Skeleton } from '@/components/ui/skeleton';

export const TogetherSolvedSectionSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-[34px] w-[204px] rounded-sm" />
        <Skeleton className="h-[24px] w-[122px] rounded-sm" />
      </div>
      <Skeleton className="h-[175px] w-full rounded-sm" />
      <Skeleton className="h-[42px] w-full rounded-sm" />
    </>
  );
};
