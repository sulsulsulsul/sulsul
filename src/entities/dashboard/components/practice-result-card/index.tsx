import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { SmileAnimation } from '@/components/lotties/smile-animation'
import { ThinkingAnimation } from '@/components/lotties/thinking-animation'
import { cn } from '@/lib/utils'
interface PracticeResultCardProps extends HTMLAttributes<HTMLDivElement> {
  type: 'good' | 'bad' | 'time'
  value: string | number
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
          <h4 className="text-4xl font-bold">{value}</h4>
          <PracticeResultCardTitle type={type} />
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
          <PracticeResultCardIcon type={type} />
        </div>
      </div>
    </div>
  )
}

const PracticeResultCardIcon = ({
  type,
}: {
  type: PracticeResultCardProps['type']
}) => {
  switch (type) {
    case 'good':
      return <SmileAnimation loop={false} className="w-8" />
    case 'bad':
      return <ThinkingAnimation loop={false} className="w-8" />
    case 'time':
      return (
        <Image
          alt="clock icon"
          width={32}
          height={32}
          src={'/images/icons/etc-clock.svg'}
        />
      )
  }
}

const PracticeResultCardTitle = ({
  type,
}: {
  type: PracticeResultCardProps['type']
}) => (
  <p className="text-base font-semibold text-gray-500">
    {getPracticeResultCardTitle(type)}
  </p>
)

function getPracticeResultCardTitle(type: PracticeResultCardProps['type']) {
  switch (type) {
    case 'good':
      return '술술 말한 면접질문'
    case 'bad':
      return '답변 못한 면접 질문'
    case 'time':
      return '총 연습시간'
  }
}
