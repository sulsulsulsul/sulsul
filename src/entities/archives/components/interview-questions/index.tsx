'use client'

import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { ArchiveDetailDTO } from '@/entities/types'
import { cn } from '@/lib/utils'

import { LoadedStatus } from './status/loaded'
import { PendingStatus } from './status/pending'
interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveDetailDTO
}

export const InterviewQuestions = ({
  className,
  data,
  ...props
}: InterviewQuestionsProps) => {
  const { status } = data
  return (
    <div className={cn(className)} {...props}>
      <h2 className="flex items-center gap-1 text-4xl font-bold">
        <Image
          src="/images/icons/etc-speech.svg"
          width={32}
          height={32}
          alt="icon"
        />
        <span>면접 예상질문</span>
      </h2>
      <div className="mt-[18px] size-full">
        {status === 'READY' && <PendingStatus />}
        {status === 'COMPLETE' && (
          <LoadedStatus
            data={data.questions}
            className="h-full overflow-y-scroll"
          />
        )}
      </div>
    </div>
  )
}
