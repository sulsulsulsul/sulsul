import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
interface InitialInterviewQuestionProps extends HTMLAttributes<HTMLDivElement> {
  firstLine: string
  secondLine: string
}

export const IdleStatus = ({
  className,
  firstLine,
  secondLine,
  ...props
}: InitialInterviewQuestionProps) => {
  return (
    <div className={cn('h-full', className)} {...props}>
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <div className="relative rounded-md bg-blue-100 px-6 py-4">
          <div className="text-center text-blue-500">
            <p>{firstLine}</p>
            <p>{secondLine}</p>
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
