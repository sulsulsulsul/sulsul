import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
interface PracticeStatusChartSectionHeadingProps
  extends HTMLAttributes<HTMLDivElement> {}

export const PracticeStatusChartSectionHeading = ({
  className,
  ...props
}: PracticeStatusChartSectionHeadingProps) => {
  return (
    <div className={cn('flex gap-1.5 items-center', className)} {...props}>
      <Image
        className="translate-y-[-3px]"
        alt=""
        width={32}
        height={32}
        src={'/images/icons/etc-calendar.svg'}
      />
      <h3 className="text-4xl font-bold text-gray-800">내 연습 현황</h3>
    </div>
  )
}
