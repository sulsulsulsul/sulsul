'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';
import { useInterviewStore } from '@/store/interviewStore';

import { useInterview } from '../../hooks/use-get-interview';
import { CountDownView } from '../count-down-view';
import { TogetherSolvedHeader } from '../together-solved-header';
import { WriteAnswerModal } from '../write-answer-modal';

export const NoAnswerCompleteSection = () => {
  const { isOpenAnswerModal, setOpenAnswerModal } = useAnswerModalStore();
  const { auth } = useUserStore();
  const { accessToken } = auth;

  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const previousWeekDate = formatDate({
    date: dayjs().subtract(7, 'day'),
    formatCase: 'YYYY-MM-DD',
  });
  const { data: currentData, refetch } = useInterview(pivotDate);

  const { setInterviewData, setPreviousInterviewData } = useInterviewStore();
  const currentTitle = currentData?.content.split('\\n');

  const handleClickCreateAnswerBtn = () => {
    if (accessToken) {
      setOpenAnswerModal(true);
    }
  };
  useEffect(() => {
    if (currentData) {
      setInterviewData(currentData);
    }
  }, [currentData]);

  const profileImgs = currentData?.profileImgs || [];
  const answerCount = currentData?.answerCount || 0;

  if (!currentData?.endTime) return;

  return (
    <section className="flex flex-col gap-2">
      <TogetherSolvedHeader />
      <div className="flex h-[520px] w-full flex-col items-center justify-center gap-5 rounded-md border border-gray-200 bg-white shadow-base">
        <div className="flex max-h-[358px] w-full max-w-[300px] flex-col gap-6">
          <div className="flex flex-col items-center">
            {currentTitle?.map((line, i) => (
              <div
                className="max-w-[260px] text-center text-4xl font-bold"
                key={line}
              >
                {line}
                <br />
              </div>
            ))}
            <CountDownView endTime={currentData?.endTime} refetch={refetch} />
          </div>
          <div className="relative h-[175px] w-full">
            <Image
              fill
              className="rounded-xl"
              src={currentData.weeklyInterviewImage}
              alt="기출 이미지"
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                size={'sm'}
                variant={'default'}
                onClick={handleClickCreateAnswerBtn}
              >
                나도 답변 만들기
              </Button>
            </AlertDialogTrigger>
            {!accessToken && (
              <AlertDialogContent>
                <AlertDialogTitle />
                <SignInView callbackUrl="/" />
              </AlertDialogContent>
            )}
          </AlertDialog>
          {isOpenAnswerModal && <WriteAnswerModal />}
        </div>
        <div className="relative flex items-center gap-1 font-semibold">
          {profileImgs.length >= 3 ? (
            <>
              {profileImgs.slice(0, 3).map((v, i) => (
                <Avatar key={i} className="relative ml-[-16px] size-[30px]">
                  <AvatarImage src={v} alt="프로필 이미지" />
                </Avatar>
              ))}
              <div className="text-xs text-gray-600">
                {answerCount}명이 답변을 남기고 갔어요!
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Avatar className="relative ml-[-12px] h-[33px] w-[66px]">
                <AvatarImage src="/images/profile.svg" alt="프로필 이미지" />
              </Avatar>
              <div className="text-xs text-gray-600">
                다른 지원자들과 의견을 나눠보세요.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
