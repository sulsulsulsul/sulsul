'use client';

import Image from 'next/image';

import { Popover } from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import NoDataCard from '@/entities/practice/components/no-data-card';
import { useInterviewStore } from '@/store/interviewStore';

import { useAnswerList } from '../../hooks/use-get-answer-list';

export const WeekRankingSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const { currentData } = useInterviewStore();

  const currentInterviewId = currentData.weeklyInterviewId || 1;
  const { data: answerListData } = useAnswerList({
    interviewId: currentInterviewId,
    sortType: 'RECOMMEND',
    accessToken,
  });

  const hasNoData =
    !accessToken ||
    answerListData?.pages[0].answers.length === 0 ||
    answerListData?.pages[0].answers[0].recommendCount === 0;
  return (
    <div className="mt-[6px] flex w-full flex-col gap-2">
      <div className="relative flex justify-between">
        <div className="flex items-center gap-1">
          <Image
            src="/images/icons/icon-crown.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <div className="text-lg font-bold">이번주 랭킹</div>
        </div>
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="/images/icons/icon-information circle.svg"
                  className="absolute bottom-[3px] right-4"
                  width={20}
                  height={20}
                  alt="icon"
                />
              </TooltipTrigger>
              <TooltipContent className="fixed left-[-212px] top-[35px] flex h-[70px] w-[212px] flex-col items-center justify-center overflow-visible rounded-[10px] border-none bg-gray-700 pr-0 text-white">
                <>
                  <Image
                    className="absolute left-52 top-[-10px] rotate-90"
                    src="/images/polygonInfo.svg"
                    alt="polygonInfo"
                    width={8}
                    height={14}
                  />
                  <ul className="flex w-[187px] flex-col justify-center gap-2 text-gray-400">
                    <li className="text-sm">
                      랭킹은 다같이 면접기출의 실시간 상위 누적 추천수로
                      결정돼요.
                    </li>
                  </ul>
                </>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Popover>
      </div>

      <ul className="flex min-h-[218px] w-full flex-1 flex-col items-center justify-start gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-base">
        {!hasNoData ? (
          answerListData?.pages[0].answers.slice(0, 3).map(
            (userInfo, index) =>
              userInfo.recommendCount >= 1 && (
                <li key={userInfo.userId} className="flex w-full gap-2">
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Image src={userInfo.profileImg} fill alt="icon" />
                  </div>

                  <div className="flex w-full flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-blue-500">
                        {index === 1
                          ? 'S-마스터'
                          : index === 2
                            ? 'S-히어로'
                            : 'S-챌린저'}
                      </div>
                      <div className="text-xs font-medium text-gray-500">
                        누적 추천수
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="text-base font-bold">
                        {userInfo.nickname}
                      </div>
                      <div className="text-xs font-semibold text-gray-600">
                        {userInfo.recommendCount > 999
                          ? '999+'
                          : userInfo.recommendCount}
                      </div>
                    </div>
                  </div>
                </li>
              ),
          )
        ) : (
          <NoDataCard className="text-base font-medium text-gray-400" />
        )}
      </ul>
    </div>
  );
};
