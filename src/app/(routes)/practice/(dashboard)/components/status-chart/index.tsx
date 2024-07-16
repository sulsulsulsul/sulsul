'use client'

import { PracticeStatusChart } from '@/entities/dashboard/components/practice-status-chart'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes, useState } from 'react'
interface StatusChartProps extends HTMLAttributes<HTMLDivElement> {}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const durations = [
  {
    label: '주간',
    value: 'weekly',
  },
  {
    label: '월간',
    value: 'monthly',
  },
] as const

export const StatusChart = ({ className, ...props }: StatusChartProps) => {
  const [duration, setDuration] = useState<'weekly' | 'monthly'>('weekly')

  return (
    <div className={cn(className)} {...props}>
      <div className="flex items-center">
        <Image
          alt=""
          width={32}
          height={32}
          src={'/images/icons/etc-calendar.svg'}
        />
        <h3 className="text-4xl font-bold text-gray-800">내 연습 현황</h3>
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-3 flex items-center gap-1">
          {durations.map((d) => (
            <div
              key={d.value}
              onClick={() => setDuration(d.value)}
              className={cn('cursor-pointer rounded-base px-4 py-2', {
                'bg-blue-100 text-blue-500': duration === d.value,
              })}
            >
              {d.label}
            </div>
          ))}
        </div>
        <div className="rounded-base bg-gray-100 px-4 py-2 text-gray-500">
          2024년 6월 둘째주
        </div>
      </div>
      <div className="mt-6 flex h-[318px] w-full overflow-hidden rounded-md bg-white">
        <PracticeStatusChart
          data={Array(duration === 'weekly' ? 7 : 12)
            .fill(0)
            .map(() => {
              if (duration === 'weekly') {
                return randomNum(0, 20)
              }
              return randomNum(0, 100)
            })}
          type={duration}
        />
      </div>
    </div>
  )
}
