import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Question } from './page'
interface AskCardProps extends HTMLAttributes<HTMLDivElement> {
  question: Question
  remainingQuestions: number
}

export const AskCard = ({
  className,
  question,
  remainingQuestions,
  ...props
}: AskCardProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-md bg-blue-500 px-[120px] text-white">
        <h2 className="text-center text-4xl font-bold">{question.content}</h2>
        <div className="absolute right-9 top-8 flex items-center gap-1 text-xl font-semibold">
          <span className="opacity-60">남은 문항</span>
          <span>{remainingQuestions}</span>
        </div>

        <Image
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          src={'/images/character-interviewer.svg'}
          alt="interviewer character"
          width={198}
          height={162}
        />
      </div>
    </div>
  )
}
