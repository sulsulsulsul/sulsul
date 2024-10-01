'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { SignInView } from '@/entities/auth/views/sign-in-view';
import NoDataCard from '@/entities/practice/components/no-data-card';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useInterviewStore } from '@/store/interviewStore';

import { useAnswerList } from '../../hooks/use-get-answer-list';
import { ViewAllAnswersModal } from '../view-all-answers-modal';

export const DEFAULT_IMAGE_URL = '/images/suri-profile.svg';

export const BestCommentsSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const { previousData } = useInterviewStore();
  const {
    isOpenAllAnswerModal,
    setIsOpenAllAnswerModal,
    isBestAnswerSection,
    setIsBestAnswerSection,
  } = useAnswerModalStore();
  const lastWeekInterviewId = previousData?.weeklyInterviewId || 10;
  const { data: answerListData } = useAnswerList({
    interviewId: lastWeekInterviewId,
    sortType: 'RECOMMEND',
    accessToken: accessToken,
    count: 3,
  });

  const previousTitle = previousData?.content.replace(/\\n/g, ' ');
  const hasNoData = !accessToken || answerListData?.totalCount === 0;

  const handleClickAnswerViewBtn = () => {
    setIsBestAnswerSection(true);
    setIsOpenAllAnswerModal(true);
  };

  const handleClickCloseBtn = () => {
    setIsBestAnswerSection(false);
    setIsOpenAllAnswerModal(false);
  };

  useEffect(() => {
    setIsOpenAllAnswerModal(isOpenAllAnswerModal);
  }, [isOpenAllAnswerModal]);

  return (
    <>
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
          {!hasNoData ? (
            <>
              <div className="flex gap-[13px] text-lg font-bold">
                <div>Q</div>
                <div>{previousTitle}</div>
              </div>
              <ul className="flex min-h-[291px] w-full flex-col gap-6">
                {answerListData?.answers.map((answerData, index) => (
                  <li key={answerData.userId} className="flex gap-[13px]">
                    <div className="text-lg font-semibold text-gray-400">
                      {index + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <div className="relative size-6 overflow-hidden rounded-full">
                          <Image
                            src={
                              answerData.profileImg.startsWith('https')
                                ? answerData.profileImg
                                : DEFAULT_IMAGE_URL
                            }
                            fill
                            alt="icon"
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          {answerData.nickname}
                        </div>
                      </div>
                      <div className="line-clamp-2 break-all text-base font-medium text-gray-700">
                        {answerData.content}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="mt-2 w-full border-t border-gray-200 pt-3 text-center text-base text-gray-500"
                onClick={handleClickAnswerViewBtn}
              >
                Best 답변 모두 보기
              </button>
            </>
          ) : (
            <NoDataCard className="text-base font-semibold text-gray-400" />
          )}
        </div>
      </div>
      {accessToken && isOpenAllAnswerModal && isBestAnswerSection && (
        <ViewAllAnswersModal handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </>
  );
};
