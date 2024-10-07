import { Skeleton } from '@/components/ui/skeleton';

export const WeekRankingSectionSkeleton = () => {
  return (
    <>
      <div className="mt-2 flex w-full items-center gap-2">
        <Skeleton className="relative size-10 overflow-hidden rounded-full" />
        <Skeleton className="h-6 w-[190px] rounded-sm" />
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="relative size-10 overflow-hidden rounded-full" />
        <Skeleton className="h-6 w-[190px] rounded-sm" />
      </div>
      <div className="flex w-full items-center gap-2">
        <Skeleton className="relative size-10 overflow-hidden rounded-full" />
        <Skeleton className="h-6 w-[190px] rounded-sm" />
      </div>
    </>
  );
};
