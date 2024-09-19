'use client';
import Image from 'next/image';

import { useInterviewStore } from '@/store/interviewStore';

import { useAnswerList } from '../../hooks/use-get-answer-list';

export const BestCommentsSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const { currentData, previousData } = useInterviewStore();
  const lastWeekInterviewId = previousData?.weeklyInterviewId || 0;
  const { data: answerListData } = useAnswerList({
    interviewId: lastWeekInterviewId,
    sortType: 'RECOMMEND',
    accessToken: accessToken,
  });
  return (
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
      <div className="flex h-[478px] w-full flex-col items-center justify-center gap-4 rounded-md border border-gray-200 bg-white px-5 shadow-base">
        {accessToken ? (
          <>
            <div className="flex gap-[13px] text-lg font-bold">
              <div>Q</div>
              <div>{previousData?.content}</div>
            </div>
            <ul className="flex min-h-[291px] w-full flex-col gap-6">
              {answerListData?.answerDetailResponses.map((answerData) => (
                <li key={answerData.userId} className="flex gap-[13px]">
                  <div className="text-lg font-semibold text-gray-400">1</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/suri-profile.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                      <div className="text-sm text-gray-600">
                        {answerData.nickname}
                      </div>
                    </div>
                    <div className="line-clamp-2 break-all text-base text-gray-700">
                      {answerData.content}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-2 w-full border-t border-gray-200 pt-3 text-center text-base text-gray-500">
              Best 답변 모두 보기
            </button>
          </>
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
      </div>
    </div>
  );
};
