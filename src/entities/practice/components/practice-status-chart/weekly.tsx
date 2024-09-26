'use client';

import { HTMLAttributes, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions, Plugin } from 'chart.js';

import { cn } from '@/lib/utils';

const week = new Date().getDay();

// 0 -> 월요일, 1 -> 화요일, ... 6 -> 일요일
const weekIndex = (week + 6) % 7;

const weeklyPlugin: Plugin = {
  id: 'customWeeklyTooltip',
  afterTooltipDraw: (chart) => {
    const tooltip = chart.tooltip;
    const activeElements = tooltip!.getActiveElements();
    if (!activeElements.length && tooltip) {
      tooltip!.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: weekIndex,
          },
        ],
        tooltip.options.callbacks!.label as any,
      );
      chart.update();
    }
  },
  afterDraw: (chart) => {
    const tooltip = chart.tooltip;
    const activeElements = tooltip!.getActiveElements();
    if (!activeElements.length && tooltip) {
      tooltip.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: weekIndex,
          },
        ],
        tooltip.options.callbacks!.label as any,
      );
      chart.update();
    }
  },
};

interface WeeklyChartProps extends HTMLAttributes<HTMLDivElement> {
  options: ChartOptions<'bar'>;
  data: ChartData<'bar'>;
}

export const WeeklyChart = ({
  className,
  data,
  options,
  ...props
}: WeeklyChartProps) => {
  data.labels = ['월', '화', '수', '목', '금', '토', '일'];
  options.plugins!.tooltip!.callbacks = {
    ...options.plugins!.tooltip!.callbacks,
    label: (context) => {
      const currentIndex = context.dataIndex;
      const title = currentIndex === week - 1 ? '오늘' : `${context.label}`;
      return `${title}: ${context.raw}`;
    },
  };
  useEffect(() => {
    Chart.register(weeklyPlugin);
    return () => {
      Chart.unregister(weeklyPlugin);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative p-5 h-full w-full flex items-center justify-center overflow-scroll mobile:py-0 mobile:px-5',
        className,
      )}
      {...props}
    >
      <Bar options={options} data={data} />
    </div>
  );
};
