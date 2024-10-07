import { Skeleton } from '@/components/ui/skeleton';

export const BestAnswerListSectionSkeleton = () => {
  return (
    <div className="mt-[2px] flex flex-col gap-[42px]">
      <Skeleton className="h-6 w-[206px] rounded-sm" />

      <ul className="flex min-h-[312px] w-full flex-col gap-[30px]">
        {[...Array(3)].map((_, index) => (
          <li key={index} className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-6 w-[108px] rounded-sm" />
            </div>
            <Skeleton className="h-[52px] w-full rounded-sm" />
          </li>
        ))}
      </ul>
    </div>
  );
};
