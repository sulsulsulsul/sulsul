import Image from 'next/image';

import OnehundredQa from '@/app/(routes)/solved/components/onehundred-qa';
import NoDataCard from '@/entities/practice/components/no-data-card';
import { BestCommentsSection } from '@/entities/solved/components/best-comments-section';
import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';
import { formatDate } from '@/shared/helpers/date-helpers';

interface SolvedProps {
  accessToken: string;
  userId: number;
}
export const Solved = ({ accessToken, userId }: SolvedProps) => {
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  return (
    <main className="flex w-full gap-6">
      <div className="hidden lg:flex lg:w-[282px] lg:flex-col lg:gap-[30px] ">
        <MyActivitySection userId={userId} accessToken={accessToken} />
        <WeekRankingSection accessToken={accessToken} pivotDate={pivotDate} />

        <Image
          src="/images/gift-banner.svg"
          width={282}
          height={147}
          alt="banner"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 md:px-0 lg:px-0 mobile:w-[50%]">
        <TogetherSolvedSection pivotDate={pivotDate} />
        <OnehundredQa accessToken={accessToken} />
      </div>
      <div className="hidden lg:mt-[6px] lg:flex lg:w-[282px] lg:flex-col lg:gap-2">
        <div className="flex items-center gap-1">
          <Image
            src="/images/icons/icon-pin.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <h3 className="text-lg font-bold">지난주 BEST 답변</h3>
        </div>
        <div className="relative flex h-[478px] w-full flex-col items-center rounded-md border border-gray-200 bg-white pb-[27px] pt-[30px] shadow-base">
          {accessToken ? (
            <BestCommentsSection accessToken={accessToken} />
          ) : (
            <NoDataCard className="border-none text-base font-medium text-gray-400 shadow-none" />
          )}
        </div>
      </div>
    </main>
  );
};
