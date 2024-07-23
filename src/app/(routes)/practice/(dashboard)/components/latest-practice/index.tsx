import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { DashboardQuestionCard } from '@/components/cards/dashboard-question-card'
import { cn } from '@/lib/utils'
interface LatestPracticeProps extends HTMLAttributes<HTMLDivElement> {}

export const LatestPractice = ({
  className,
  ...props
}: LatestPracticeProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex items-center">
        <Image
          alt=""
          width={32}
          height={32}
          src={'/images/icons/etc-speech.svg'}
        />
        <h3 className="text-4xl font-bold text-gray-800">연습한 면접질문</h3>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <div className="rounded-base bg-blue-100 px-4 py-2 text-blue-500">
          답하지 못했던 24
        </div>
        <div className="rounded-base px-4 py-2 text-gray-500">힌트를 본 12</div>
        <div className="rounded-base px-4 py-2 text-gray-500">
          즐겨 찾기한 5
        </div>
      </div>
      <div className="mt-6 flex h-[318px] flex-col gap-3 overflow-y-scroll scrollbar-hide">
        <DashboardQuestionCard />
        <DashboardQuestionCard />
        <DashboardQuestionCard />
        <DashboardQuestionCard />
      </div>
    </div>
  )
}
