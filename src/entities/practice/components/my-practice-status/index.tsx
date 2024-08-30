'use client';

import { HTMLAttributes, useState } from 'react';

import { PracticeStatusChart } from '@/entities/practice/components/practice-status-chart';
import { cn } from '@/lib/utils';
import {
  formatDate,
  formatDateInWeekKorean,
} from '@/shared/helpers/date-helpers';

import useStatisticsDetail from '../../hooks/use-statistics-detail';
import { Period } from '../../types';
import NoDataCard from '../no-data-card';
import PracticeSectionHeader from '../practice-section-header';
import { PracticedStatusChartTab } from '../practice-status-chart-tab';
interface StatusChartProps extends HTMLAttributes<HTMLDivElement> {
  userId: number;
}

const MyPracticeChart = ({ className, userId }: StatusChartProps) => {
  const [chartPeriod, setChartPeriod] = useState<Period>('WEEKLY');

  const { data: statisticsDetail, isSuccess: isSuccessStatisticsDetail } =
    useStatisticsDetail({ params: { period: chartPeriod, userId } });

  const onChangeChartType = (type: Period) => {
    setChartPeriod(type);
  };

  if (!isSuccessStatisticsDetail) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <PracticeSectionHeader
        title="내 연습 현황"
        iconSrc="/images/icons/etc-calendar.svg"
      />
      <div className="flex items-center justify-between">
        <PracticedStatusChartTab
          className="mt-3"
          chartType={chartPeriod}
          onChangeChartType={onChangeChartType}
        />
        <div className="rounded-base bg-gray-100 px-4 py-2 text-gray-500">
          {/* TODO: 주, 월 이동 처리 */}
          {chartPeriod === 'WEEKLY'
            ? formatDateInWeekKorean()
            : formatDate(new Date(), 'YYYY년')}
        </div>
      </div>
      <div className="mt-6 flex h-[318px] w-full overflow-hidden rounded-md bg-white">
        {statisticsDetail.length > 0 ? (
          <PracticeStatusChart
            data={statisticsDetail.map((detail) => detail.count)}
            type={chartPeriod}
          />
        ) : (
          <NoDataCard />
        )}
      </div>
    </div>
  );
};

export default MyPracticeChart;
