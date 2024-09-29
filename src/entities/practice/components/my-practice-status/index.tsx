'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

dayjs.extend(weekday);

interface StatusChartProps extends HTMLAttributes<HTMLDivElement> {
  userId: number;
}

const MyPracticeChart = ({ className, userId }: StatusChartProps) => {
  const [chartPeriod, setChartPeriod] = useState<Period>('WEEKLY');
  const [pivotDate, setPivotDate] = useState(
    formatDate({ formatCase: 'YYYY-MM-DD' }),
  );

  const { data: statisticsDetail, isSuccess: isSuccessStatisticsDetail } =
    useStatisticsDetail({ params: { period: chartPeriod, userId, pivotDate } });

  const onChangeChartType = (type: Period) => {
    setChartPeriod(type);
  };

  const onChangeChartDate = (addedValue: -1 | 1) => {
    const period = chartPeriod === 'WEEKLY' ? 'week' : 'year';

    setPivotDate(dayjs(pivotDate).add(addedValue, period).format('YYYY-MM-DD'));
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
        <div className="flex items-center rounded-base bg-gray-100 py-2 pl-4 pr-2 text-gray-500">
          {chartPeriod === 'WEEKLY'
            ? formatDateInWeekKorean(dayjs(pivotDate))
            : formatDate({ date: dayjs(pivotDate), formatCase: 'YYYY년' })}

          <button type="button" onClick={() => onChangeChartDate(-1)}>
            <ChevronLeft className="m-1 size-4 text-gray-400" />
          </button>
          <img src="/images/icons/icon-rod.svg" alt="" />
          <button type="button" onClick={() => onChangeChartDate(1)}>
            <ChevronRight className="m-1 size-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="mt-6 flex h-[318px] w-full overflow-hidden rounded-md bg-white mobile:mb-10">
        {/* TODO: 데이터 노출 후 라벨 확인 필요 */}
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
