'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import NoDataCard from '@/entities/practice/components/no-data-card';
import { InterviewData } from '@/entities/types/interview';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerModalStore } from '@/store/answerModalStore';

import { useAnswerList } from '../../hooks/use-get-answer-list';
import { useInterview } from '../../hooks/use-get-interview';
import { BestAnswerListSectionSkeleton } from '../../skeletons/best-answer-list-section-skeleton';
import { ViewAllAnswersModal } from '../view-all-answers-modal';

export const DEFAULT_IMAGE_URL = '/images/suri-profile.svg';

export const BestCommentsSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const {
    isOpenAllAnswerModal,
    setIsOpenAllAnswerModal,
    isBestAnswerSection,
    setIsBestAnswerSection,
  } = useAnswerModalStore();
  const previousWeekDate = formatDate({
    date: dayjs().subtract(7, 'day'),
    formatCase: 'YYYY-MM-DD',
  });
  const {
    data: previousInterviewData,
    isSuccess: isSuccessPreviousInterviewData,
    isLoading: isLoadingInterview,
  } = useInterview(previousWeekDate);

  const { data: answerListData, isLoading: isLoadingAnswerList } =
    useAnswerList({
      interviewId: previousInterviewData?.weeklyInterviewId || 0,
      sortType: 'RECOMMEND',
      accessToken: accessToken,
      interviewData: previousInterviewData,
    });

  const previousTitle = previousInterviewData?.content.replace(/\\n/g, ' ');
  const hasNoData =
    !accessToken ||
    !answerListData ||
    !previousInterviewData ||
    answerListData?.pages[0].totalCount === 0;

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
  }, [isOpenAllAnswerModal, setIsOpenAllAnswerModal]);
  const isLoadingState = isLoadingInterview || isLoadingAnswerList;
  return (
    <>
      {isLoadingState ? (
        <BestAnswerListSectionSkeleton />
      ) : hasNoData ? (
        <NoDataCard className="border-none text-base font-medium text-gray-400 shadow-none" />
      ) : (
        <>
          <div className="flex flex-col gap-4 pl-4">
            <div className="flex w-full gap-1 pr-5 text-lg font-bold">
              <div className="flex h-[26px] min-w-[26px] items-center justify-center">
                Q
              </div>
              <p className="w-full">{previousTitle}</p>
            </div>
            <ul className="flex max-h-[291px] w-full flex-col gap-6 pr-[30px]">
              {answerListData?.pages[0].answers
                .slice(0, 3)
                .map((answerData, index) => (
                  <li key={answerData.userId} className="flex flex-1 gap-1">
                    <div className="flex">
                      <div className="flex size-[26px] flex-1 items-center justify-center text-lg font-semibold text-gray-400">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
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
          </div>
          <button
            className="absolute bottom-[27px] w-full border-t border-gray-200 pt-3 text-center text-base text-gray-500"
            onClick={handleClickAnswerViewBtn}
          >
            Best 답변 모두 보기
          </button>
        </>
      )}

      {accessToken && isOpenAllAnswerModal && isBestAnswerSection && (
        <ViewAllAnswersModal handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </>
  );
};
