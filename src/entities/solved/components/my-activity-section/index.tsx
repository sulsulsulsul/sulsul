'use client';
import Image from 'next/image';

import { useUserActivity } from '../../hooks/use-get-activity';
import { MyActivitySectionSkeleton } from '../../skeletons/my-activity-section-skeleton';

interface MyActivitySectionProps {
  userId: number;
  accessToken: string;
}
export const MyActivitySection = ({
  userId,
  accessToken,
}: MyActivitySectionProps) => {
  const { data: userActivityData, isLoading } = useUserActivity({
    userId,
    accessToken,
  });
  const current = userActivityData?.current || 0;
  const total = userActivityData?.total || 0;
  return (
    <div className="mt-[6px] flex w-full flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-my-activity.svg"
          width={24}
          height={24}
          alt="icon"
        />
        <h3 className="text-lg font-bold text-gray-900">내 활동</h3>
      </div>
      <div className="flex h-[130px] w-full flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-5 shadow-base">
        <div className="flex w-full flex-col gap-1 text-lg">
          {isLoading ? (
            <MyActivitySectionSkeleton />
          ) : (
            <>
              <h3 className="font-bold text-gray-700">내가 받은 추천수</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="font-semibold text-gray-500">이번달</div>
                  <div className="font-semibold text-blue-500">{current}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-semibold text-gray-500">전체</div>
                  <div className="font-semibold text-blue-500">{total}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
