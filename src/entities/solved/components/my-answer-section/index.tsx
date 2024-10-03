import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { AnswerListData } from '@/entities/types/interview';
import { cn } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';

import { useAnswerRecommend } from '../../hooks/use-answer-recommend';
import { ReConfirmModal } from '../re-confirm-modal';
import { WriteAnswerModal } from '../write-answer-modal';

interface MyAnswerSectionProp {
  myWriteAnswerData: AnswerListData;
  interviewId: number;
  userId: number;
  pivotDate: string;
  accessToken: string;
}
export const MyAnswerSection = ({
  myWriteAnswerData,
  interviewId,
  userId,
  pivotDate,
  accessToken,
}: MyAnswerSectionProp) => {
  const [isOpenMoreMenu, setOpenMoreMenu] = useState(false);
  const { isRecommended, weeklyInterviewAnswerId } = myWriteAnswerData;
  const {
    isOpenDeleteModal,
    isOpenAnswerModal,
    isEditModal,
    isOpenAllAnswerModal,
    setOpenDeleteModal,
    setOpenAnswerModal,
    setIsOpenAllAnswerModal,
    setIsEditModal,
  } = useAnswerModalStore();

  const { mutate: recommendMutation, error } = useAnswerRecommend({
    accessToken,
    currentInterviewId: interviewId,
    userId,
    pivotDate,
  });

  const handleClickMoreMenu = () => {
    setOpenMoreMenu((prev) => !prev);
  };

  const handleClickEditMenu = () => {
    setIsEditModal(true);
    setIsOpenAllAnswerModal(false);
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

  useEffect(() => {
    if (error?.message === 'Request failed with status code 401') {
      toast.error('로그인 후 서비스를 이용해주세요.');
      redirect('/solved');
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-bold text-gray-700">내가 쓴 답변</h4>
        <p className="max-h-[200px] overflow-y-scroll text-lg font-medium text-gray-800">
          {myWriteAnswerData?.content}
        </p>
      </div>

      <div className="relative flex items-center justify-between">
        {isOpenMoreMenu && (
          <div className="absolute right-6 top-[-12px] z-[999] flex h-[98px] w-[135px] flex-col justify-center rounded-sm border border-gray-200 bg-white text-[14px] font-medium text-gray-700">
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
        {isRecommended ? (
          <Button
            className={cn(`flex h-[36px] w-[71px] gap-1 p-2 text-blue-500`)}
            variant="outline"
            onClick={handleClickRecommendBtn}
          >
            <Image
              src="/images/icons/icon-like-blue.svg"
              width={20}
              height={20}
              alt="icon"
            />
            <p className="text-xs">추천</p>
          </Button>
        ) : (
          <Button
            className={cn(`flex h-[36px] w-[71px] gap-1 p-2 text-gray-600`)}
            variant="outline"
            onClick={handleClickRecommendBtn}
          >
            <Image
              src="/images/icons/icon-like.svg"
              width={20}
              height={20}
              alt="icon"
            />
            <p className="text-xs">추천</p>
          </Button>
        )}
        <Image
          src="/images/icons/icon-more-vertical.svg"
          width={24}
          height={24}
          alt="더보기"
          className="cursor-pointer"
          onClick={handleClickMoreMenu}
        />
      </div>
      {isOpenAnswerModal && <WriteAnswerModal />}
      {isOpenDeleteModal && (
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
    </div>
  );
};
