'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useInterviewStore } from '@/store/interviewStore';

import { useInterview } from '../../hooks/use-get-interview';
import { WriteSolvedModal } from '../../write-answer-modal';
import { CountDownView } from '../count-down-view';

export const TogetherSolvedContent = () => {
  const [openModal, setOpenModal] = useState(false);
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const previousWeekDate = formatDate({
    date: dayjs().subtract(7, 'day'),
    formatCase: 'YYYY-MM-DD',
  });
  const { data: currentData, refetch } = useInterview(pivotDate);
  const { data: previousData } = useInterview(previousWeekDate);
  const { setInterviewData, setPreviousInterviewData } = useInterviewStore();
  const currentTitle = currentData?.content.split('\\n');

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
    <div className="flex w-full max-w-[300px] flex-col gap-6">
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
          src="https://via.placeholder.com/300x175"
          alt="기출 이미지"
        />
      </div>

      <Button
        type="button"
        size={'sm'}
        variant={'default'}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        나도 답변 만들기
      </Button>
      {openModal && (
        <WriteSolvedModal setModal={setOpenModal} className="mobile:hidden" />
      )}
    </div>
  );
};
