'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UNAUTHORIZED_MESSAGE } from '@/config/constants/error-message';
import { AnswerListData } from '@/entities/types/interview';
import { cn, removeNewlines } from '@/lib/utils';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerListStore } from '@/store/answerListStore';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';
import { useInterviewStore } from '@/store/interviewStore';
import { useMyAnswerStore } from '@/store/myAnswerStore';

import { useAnswerRecommend } from '../../hooks/use-answer-recommend';
import { CountDownView } from '../count-down-view';
import { ReConfirmModal } from '../re-confirm-modal';
import { ViewAllAnswersModal } from '../view-all-answers-modal';
import { WriteAnswerModal } from '../write-answer-modal';

//리팩토링 예정

export const AnswerCompleteSection = ({
  myWriteAnswerData,
}: {
  myWriteAnswerData: AnswerListData;
}) => {
  const router = useRouter();
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const [filteredResponses, setFilteredResponses] = useState<AnswerListData[]>(
    [],
  );

  const [isOpenMoreMenu, setOpenMoreMenu] = useState(false);
  const { isRecommended, weeklyInterviewAnswerId, recommendCount } =
    myWriteAnswerData;

  const { auth, data } = useUserStore();
  const { userId, accessToken } = auth;

  const {
    isOpenDeleteModal,
    isOpenAnswerModal,
    isOpenAllAnswerModal,
    isTogetherSection,
    setOpenDeleteModal,
    setOpenAnswerModal,
    setIsOpenAllAnswerModal,
    setIsEditModal,
    setIsTogetherSection,
  } = useAnswerModalStore();
  const { setMyAnswerData } = useMyAnswerStore();
  const { answerListData } = useAnswerListStore();

  const { currentData, refetch } = useInterviewStore();
  const { mutate: recommendMutation, error } = useAnswerRecommend({
    currentInterviewId: currentData?.weeklyInterviewId || 0,
    accessToken,
    userId,
    pivotDate,
  });

  const handleClickMoreMenu = () => {
    setOpenMoreMenu((prev) => !prev);
  };

  const handleClickEditMenu = () => {
    setIsOpenAllAnswerModal(false);
    setIsEditModal(true);
    setOpenAnswerModal(true);
    setOpenMoreMenu(false);
  };

  const handleClickDeleteMenu = () => {
    setOpenDeleteModal(true);
    setOpenMoreMenu(false);
  };

  const handleClickRecommendBtn = () => {
    recommendMutation({
      isRecommended,
      answerId: weeklyInterviewAnswerId,
    });
  };

  const handleClickAnswerViewBtn = () => {
    setIsTogetherSection(true);
    setIsOpenAllAnswerModal(true);
  };

  const handleClickCloseBtn = () => {
    setIsTogetherSection(false);
    setIsOpenAllAnswerModal(false);
  };

  useEffect(() => {
    if (answerListData) {
      setFilteredResponses(
        answerListData?.pages[0].answers.filter(
          (response) => response.userId !== userId,
        ),
      );
      setMyAnswerData(myWriteAnswerData);
    }
  }, [answerListData, userId]);

  useEffect(() => {
    if (error?.message === UNAUTHORIZED_MESSAGE) {
      router.push('/solved');
    }
  }, [error]);

  if (!currentData?.endTime) return;

  return (
    <>
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-sm bg-blue-500 px-[12px] py-[6px] text-2xs font-semibold text-white ">
              <Image
                src="/images/icons/icon-check-white.svg"
                alt="참여완료"
                width={14}
                height={14}
              />
              <p>참여완료</p>
            </div>
            <CountDownView endTime={currentData?.endTime} refetch={refetch} />
          </div>

          <h1 className="text-4xl font-bold">
            {removeNewlines(currentData?.content)}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold text-gray-700">내가 쓴 답변</h4>
          <p className="text-lg font-medium text-gray-800">
            {myWriteAnswerData?.content}
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-between">
        {isOpenMoreMenu && (
          <div className="absolute right-6 top-[-12px] flex h-[98px] w-[135px] flex-col justify-center rounded-sm border border-gray-200 bg-white text-[14px] font-medium text-gray-700">
            <button
              className="relative flex h-[41px] items-center hover:bg-gray-50"
              onClick={handleClickEditMenu}
            >
              <span className="absolute left-4">수정하기</span>
            </button>
            <button
              className="flex h-[41px] items-center hover:bg-gray-50"
              onClick={handleClickDeleteMenu}
            >
              <span className="absolute left-4">삭제하기</span>
            </button>
          </div>
        )}
        <Button
          className={cn(
            `flex h-[36px] w-fit gap-1 px-3 py-2 border-gray-200 font-semibold ${isRecommended ? 'text-blue-500' : 'text-gray-600'} `,
          )}
          variant="outline"
          onClick={() =>
            recommendMutation({
              isRecommended: isRecommended,
              answerId: weeklyInterviewAnswerId,
            })
          }
        >
          <Image
            src={
              isRecommended
                ? '/images/icons/icon-like-blue.svg'
                : '/images/icons/icon-like.svg'
            }
            width={20}
            height={20}
            alt="icon"
          />
          <p className="text-xs">추천 {recommendCount}</p>
        </Button>
        <Image
          src="/images/icons/icon-more-vertical.svg"
          width={24}
          height={24}
          alt="더보기"
          className="cursor-pointer"
          onClick={handleClickMoreMenu}
        />
      </div>

      <hr />
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-bold">
          다른 지원자들의 답변{' '}
          <span className="text-blue-500">{filteredResponses.length}</span>
        </h4>

        {filteredResponses.length === 0 ? (
          <p className="font-medium text-gray-500">
            {data.nickname}님이 첫 답변을 남기셨군요!
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="flex h-[22px] w-fit items-center justify-center gap-1 rounded-[4px] bg-red-100 px-[12px] py-[6px] text-2xs font-semibold text-[#ff5a61] ">
                  <p>BEST</p>
                </div>
                {filteredResponses[0]?.nickname}
              </div>
              <p className="line-clamp-2 font-medium text-gray-800">
                {filteredResponses[0]?.content}
              </p>
            </div>
            <div className="flex w-full justify-center">
              <Button
                variant="outline"
                className="h-12 w-[300px]"
                onClick={handleClickAnswerViewBtn}
              >
                답변 모두 보기
              </Button>
            </div>
          </div>
        )}
      </div>

      {isOpenAnswerModal && <WriteAnswerModal />}
      {isOpenDeleteModal && !isOpenAllAnswerModal && (
        <>
          <div
            className={cn(
              `fixed flex w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center`,
            )}
          ></div>
          <div className="fixed left-0 top-0 z-[70] flex h-screen w-screen items-center justify-center">
            <ReConfirmModal
              type="delete"
              myWriteAnswerData={myWriteAnswerData}
            />
          </div>
        </>
      )}
      {accessToken && isOpenAllAnswerModal && isTogetherSection && (
        <ViewAllAnswersModal handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </>
  );
};
