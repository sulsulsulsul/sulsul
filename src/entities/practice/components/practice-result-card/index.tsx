'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import { cn } from '@/lib/utils';
import { useOpenModalStore } from '@/store/modal';

// TODO: 데이터 보고 판단
const DISPLAY_PRACTICE_TYPE = {
  good: '술술 말한 면접질문',
  bad: '답변 못한 면접질문',
  time: '총 연습시간',
} as const;

interface PracticeResultCardProps extends HTMLAttributes<HTMLDivElement> {
  type: 'good' | 'bad' | 'time';
  value: string | number;
}

export const PracticeResultCard = ({
  className,
  type,
  value,
  ...props
}: PracticeResultCardProps) => {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`;
  };

  let dataValue = type === 'time' ? formatTime(value as number) : value;
  let { setSelectedTab } = useOpenModalStore();
  const router = useRouter();
  const handleClick = () => {
    if (type == 'good' || type == 'bad') {
      setSelectedTab(type);
      router.push('/practice/list');
    }
  };

  return (
    <div
      className={cn(
        'h-[273px] w-[282px] rounded-md bg-white p-[26px] shadow-base mobile:h-[172px] mobile:w-[153px] mobile:shrink-0 mobile:pt-[24px] mobile:px-[20px] mobile:pb-[16px] border border-gray-200 ',
        className,
      )}
      {...props}
      onClick={handleClick}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h4
            className={cn('text-4xl font-semibold text-gray-800', {
              'text-gray-200': value === 0,
            })}
          >
            {dataValue}
          </h4>
          <p className="text-base font-medium text-gray-500 mobile:text-xs">
            {DISPLAY_PRACTICE_TYPE[type]}
          </p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 mobile:size-[42px]">
          <PracticeResultCardIcon type={type} />
        </div>
      </div>
    </div>
  );
};

const PracticeResultCardIcon = ({
  type,
}: {
  type: PracticeResultCardProps['type'];
}) => {
  switch (type) {
    case 'good':
      return <SmileAnimation loop={false} className="w-8 mobile:w-[21px]" />;
    case 'bad':
      return <ThinkingAnimation loop={false} className="w-8 mobile:w-[21px]" />;
    case 'time':
      return (
        <img
          className="w-8 mobile:w-[21px]"
          alt="clock icon"
          src="/images/icons/etc-clock.svg"
        />
      );
  }
};
