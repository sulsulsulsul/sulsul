import { Skeleton } from '@/components/ui/skeleton';

export const MyActivitySectionSkeleton = () => {
  return (
    <div className="flex flex-col justify-start gap-3">
      <Skeleton className="h-6 w-[108px] rounded-sm" />
      <Skeleton className="h-6 w-full rounded-sm" />
    </div>
  );
};
