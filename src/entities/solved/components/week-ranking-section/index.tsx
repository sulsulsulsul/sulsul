'use client';

import Image from 'next/image';

import { useInterviewStore } from '@/store/interviewStore';

import { useAnswerList } from '../../hooks/use-get-answer-list';

export const WeekRankingSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const { currentData } = useInterviewStore();
  const currentInterviewId = currentData?.weeklyInterviewId || 0;
  const { data: answerListData } = useAnswerList({
    interviewId: currentInterviewId,
    sortType: 'RECOMMEND',
    accessToken,
    count: 3,
  });
  return (
    <div className="mt-[6px] flex w-full flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-crown.svg"
          width={24}
          height={24}
          alt="icon"
        />
        <div className="text-lg font-bold">이번주 랭킹</div>
      </div>

      <ul className="flex h-[218px] w-full flex-col items-center justify-center gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-base">
        {accessToken ? (
          answerListData?.answerDetailResponses.map((userInfo, index) => (
            <li key={userInfo.userId} className="flex w-full gap-2">
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image src={userInfo.profileImg} fill alt="icon" />
              </div>

              <div className="flex w-full flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-2xs font-semibold text-blue-500">
                    {index === 1
                      ? 'S-마스터'
                      : index === 2
                        ? 'S-히어로'
                        : 'S-챌린저'}
                  </div>
                  <div className="text-2xs font-semibold text-gray-500">
                    누적 추천수
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-gray-700">
                    {userInfo.nickname}
                  </div>
                  <div className="text-2xs font-bold">
                    {userInfo.recommendCount > 999
                      ? '999+'
                      : userInfo.recommendCount}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/no-data-face.svg"
              width={42}
              height={42}
              alt="no-data"
            />
            <p className="text-base font-semibold text-gray-400">
              아직 데이터가 없어요
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};
