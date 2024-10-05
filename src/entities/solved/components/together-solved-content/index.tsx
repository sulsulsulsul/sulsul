'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { AlertDialogContent } from '@radix-ui/react-alert-dialog';
import dayjs from 'dayjs';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';
import { useInterviewStore } from '@/store/interviewStore';
import { useVideoStateStore } from '@/store/modal';

import { useInterview } from '../../hooks/use-get-interview';
import { CountDownView } from '../count-down-view';
import { WriteAnswerModal } from '../write-answer-modal';

export const TogetherSolvedContent = () => {
  const { isOpenAnswerModal, setOpenAnswerModal } = useAnswerModalStore();
  const { auth } = useUserStore();
  const { accessToken } = auth;

  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const previousWeekDate = formatDate({
    date: dayjs().subtract(7, 'day'),
    formatCase: 'YYYY-MM-DD',
  });
  const { data: previousData } = useInterview(previousWeekDate);
  const { currentData, setInterviewData, setPreviousInterviewData, refetch } =
    useInterviewStore();
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
    if (previousData) {
      setPreviousInterviewData(previousData);
    }
  }, [currentData, previousData]);

  if (!currentData?.endTime) return;

  return (
    <div className="flex max-h-[358px] w-full max-w-[300px] flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
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
  );
};
