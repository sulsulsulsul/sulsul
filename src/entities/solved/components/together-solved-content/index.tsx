'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useInterviewStore } from '@/store/interviewStore';

import { useInterview } from '../../hooks/use-get-interview';
import { getTimeRemaining } from '../timer';

export const TogetherSolvedContent = () => {
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const { data, refetch } = useInterview(pivotDate);
  const { setInterviewData } = useInterviewStore();

  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (data) {
      setInterviewData(data);
    }
    if (!data?.endTime) return;

    const { timeString, timeDiff } = getTimeRemaining(data.endTime);
    setTimeRemaining(timeString);

    const intervalId = setInterval(() => {
      const { timeString, timeDiff } = getTimeRemaining(data.endTime);
      setTimeRemaining(timeString);

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        refetch();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data?.endTime, refetch]);

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <h2 className="max-h-[68px] max-w-[232px] text-center text-4xl font-bold">
          {data?.content}
        </h2>
        <div className="text-sm text-gray-500">{timeRemaining}</div>
      </div>
      <div className="relative h-[175px] w-full">
        <Image
          fill
          className="rounded-xl"
          src="https://via.placeholder.com/300x175"
          alt="기출 이미지"
        />
      </div>

      <Button size={'sm'} variant={'default'}>
        나도 답변 만들기
      </Button>
    </div>
  );
};
