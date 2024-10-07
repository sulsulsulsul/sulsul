import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

function ChallengeSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div className="mb-[50px] flex items-center space-x-0 overflow-visible">
        <div className="space-y-1">
          <Skeleton className="relative left-[5px] inline-block h-[24px] w-[92px]" />
          <Skeleton className="relative h-[24px] w-[245px]" />
        </div>
      </div>
      <div
        className={cn(
          'relative h-[444px] w-full flex items-center justify-center mb-[40px]',
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 top-[-20px] flex items-center justify-center">
          <img
            src="/images/lv/skeleton.svg"
            alt="Skeleton Background"
            className="mb-[40px] mt-[100px] size-[550px] animate-pulse object-contain mobile:hidden"
          />
          <img
            src="/images/lv/skeletonMobile.svg"
            alt="Skeleton Background"
            className="h-full w-[398px] animate-pulse object-contain tablet:hidden desktop:hidden"
          />
        </div>
      </div>
    </>
  );
}

export { ChallengeSkeleton };
