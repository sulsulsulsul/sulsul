'use client';

import { HTMLAttributes } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { cn, tailwindTheme } from '@/lib/utils';

import type { Period } from '../../types';
import { MonthlyChart } from './monthly';
import { WeeklyChart } from './weekly';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    tooltip: {
      enabled: true,
      displayColors: false,
      caretPadding: 3,
      xAlign: 'center' as const,
      yAlign: 'bottom' as const,
      backgroundColor: 'rgba(0,0,0,1)',
      titleColor: 'white',
      bodyColor: 'white',
      bodyFont: {
        size: 12,
        weight: 500,
      },
      intersect: true,
      mode: 'nearest',
      callbacks: {
        title: () => {
          return '';
        },
      },
    },
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: true,
      },
      ticks: {},
    },
    y: {
      beginAtZero: true,
      grid: {
        tickBorderDash: [0, 100],
      },
      border: {
        display: false,
        dash: [5, 10],
      },
      ticks: {
        count: 5,
        autoSkip: true,
        maxTicksLimit: 5,
        includeBounds: true,
        callback: (value, index) => {
          if (index === 1 || index === 3) {
            return '';
          }
          return Math.floor(value as number);
        },
      },
    },
  },
};

interface PracticeStatusChartProps extends HTMLAttributes<HTMLDivElement> {
  data: number[];
  type: Period;
}
export const PracticeStatusChart = ({
  className,
  data,
  type,
  ...props
}: PracticeStatusChartProps) => {
  const chartData: ChartData<'bar'> = {
    datasets: [
      {
        data,
        backgroundColor: tailwindTheme.colors.blue[500],
        barThickness: 20,
        borderRadius: 4,
      },
    ],
  };
  return (
    <div
      className={cn(
        'relative p-5 h-full w-full flex items-center justify-center overflow-scroll mobile:p-0',
        className,
      )}
      {...props}
    >
      {type === 'WEEKLY' ? (
        <WeeklyChart className="size-full" options={options} data={chartData} />
      ) : (
        <MonthlyChart options={options} data={chartData} />
      )}
    </div>
  );
};
