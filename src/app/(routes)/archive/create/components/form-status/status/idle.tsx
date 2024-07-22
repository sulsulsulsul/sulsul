import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
interface InitialInterviewQuestionProps
  extends HTMLAttributes<HTMLDivElement> {}

export const IdleStatus = ({
  className,
  ...props
}: InitialInterviewQuestionProps) => {
  return (
    <div
      className={cn('h-full bg-white rounded-md shadow-base', className)}
      {...props}
    >
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <div className="relative rounded-md bg-blue-100 px-6 py-4">
          <div className="text-center text-blue-500">
            <p>내 자소서에선 어떤 질문이 나올까요?</p>
            <p>왼쪽에서 내용을 입력해보세요!</p>
          </div>
          <div className="absolute bottom-0 left-1/2 size-[14px] -translate-x-1/2 translate-y-1/2 rotate-45 bg-blue-100" />
        </div>
        <Image
          src={'/images/character-curious.svg'}
          width={160}
          height={140}
          alt="궁금해하는 술술이"
        />
      </div>
    </div>
  )
}
