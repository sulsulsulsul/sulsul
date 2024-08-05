'use client';

import { HTMLAttributes, useState } from 'react';
import Image from 'next/image';

import { PracticeStatusChart } from '@/entities/dashboard/components/practice-status-chart';
import { cn } from '@/lib/utils';

import { PracticeStatusChartTabType } from '../../types';
import PracticeSectionHeader from '../practice-section-header';
import { PracticedStatusChartTab } from '../practice-status-chart-tab';
interface StatusChartProps extends HTMLAttributes<HTMLDivElement> {}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MyPracticeChart = ({ className, ...props }: StatusChartProps) => {
  const [chartType, setChartType] =
    useState<PracticeStatusChartTabType>('weekly');

  const onChangeChartType = (type: PracticeStatusChartTabType) => {
    setChartType(type);
  };

  return (
    <div className={cn(className)} {...props}>
      <PracticeSectionHeader
        title="내 연습 현황"
        iconSrc="/images/icons/etc-calendar.svg"
      />
      <div className="flex items-center justify-between">
        <PracticedStatusChartTab
          className="mt-3"
          chartType={chartType}
          onChangeChartType={onChangeChartType}
        />
        <div className="rounded-base bg-gray-100 px-4 py-2 text-gray-500">
          2024년 6월 둘째주
        </div>
      </div>
      <div className="mt-6 flex h-[318px] w-full overflow-hidden rounded-md bg-white">
        <PracticeStatusChart
          data={Array(chartType === 'weekly' ? 7 : 12)
            .fill(0)
            .map(() => {
              if (chartType === 'weekly') {
                return randomNum(0, 20);
              }
              return randomNum(0, 100);
            })}
          type={chartType}
        />
      </div>
    </div>
  );
};

export default MyPracticeChart;
