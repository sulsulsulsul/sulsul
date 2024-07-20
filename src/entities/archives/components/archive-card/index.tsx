'use client'

import { ArchiveStatus } from '@/entities/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { ArchiveCardMenu } from './archive-card-menu'
interface ArchiveCardProps extends HTMLAttributes<HTMLDivElement> {
  status: ArchiveStatus
  title: string
  answerCount: number
  questionCount: number
  companyName: string
  archiveId: number
}

const DISPLAY_ARCHIVE_STATUS = {
  READY: '작성 전',
  COMPLETE: '작성 완료',
  FAIL: '작성 실패',
  CREATING: '작성 중',
} as const

export const ArchiveCard = ({
  className,
  title,
  status,
  answerCount,
  questionCount,
  companyName,
  archiveId,
}: ArchiveCardProps) => {
  const displayStatus = DISPLAY_ARCHIVE_STATUS[status]

  let percentage = !!questionCount ? (answerCount / questionCount) * 100 : 0

  return (
    <div
      className={cn('relative w-[260px] h-[380px] px-5 text-white', className)}
    >
      <div className="absolute left-0 top-[20px] z-0 h-[90%] w-full rounded-md bg-blue-900">
        <span className="absolute right-6 top-[8px] text-2xs font-semibold text-white/70">
          {displayStatus}
        </span>
      </div>
      <Image
        className="absolute left-0 top-0 z-10 h-[380px]"
        width={400}
        height={600}
        src={'/images/folder-box.svg'}
        alt="card background image"
        priority
      />

      <div className="relative z-10 flex h-[380px] flex-col bg-transparent pb-[50px] pt-[62px]">
        <div className="flex justify-between">
          <div className="rounded-sm bg-gray-100 px-[10px] py-[7px] text-blue-500">
            <h3 className="text-2xs font-semibold">{companyName}</h3>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ArchiveCardMenu archiveId={archiveId} />
          </div>
        </div>
        <div className="mt-3 h-[84px]">
          <h4 className="line-clamp-3">{title}</h4>
        </div>

        {questionCount === 0 ? (
          <div className="mt-[20px] text-lg font-normal">
            아직 생성된 질문이 없어요
          </div>
        ) : (
          <div className="mt-[20px] text-lg font-normal">
            예상 면접 질문{' '}
            <span className="text-green-point">{questionCount}</span>
          </div>
        )}

        <div className="flex h-full grow flex-col justify-end">
          <div className="relative">
            <div
              className="absolute left-0 top-0 h-[6px] rounded-[6.6px] bg-white"
              style={{ width: `${percentage}%` }}
            ></div>
            <div className="h-[6px] rounded-[6.6px] bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
