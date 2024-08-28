'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import { cn } from '@/lib/utils';

// TODO: 데이터 보고 판단
const DISPLAY_PRACTICE_TYPE = {
  good: '술술 말한 면접질문',
  bad: '답변 못한 면접 질문',
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
  return (
    <div
      className={cn(
        'h-[273px] w-full rounded-md bg-white p-[26px] shadow-base',
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h4
            className={twJoin(
              'text-4xl font-bold',
              value === 0 && 'text-gray-200',
            )}
          >
            {value}
          </h4>
          <p className="text-base font-semibold text-gray-500">
            {DISPLAY_PRACTICE_TYPE[type]}
          </p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
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
      return <SmileAnimation loop={false} className="w-8" />;
    case 'bad':
      return <ThinkingAnimation loop={false} className="w-8" />;
    case 'time':
      return (
        <Image
          alt="clock icon"
          width={32}
          height={32}
          src="/images/icons/etc-clock.svg"
        />
      );
  }
};
