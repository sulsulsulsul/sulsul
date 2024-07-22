'use client'

import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { ArchiveStatus } from '@/entities/types'
import { cn } from '@/lib/utils'

import { ArchiveCardMenu } from './archive-card-menu'
interface ArchiveCardProps extends HTMLAttributes<HTMLDivElement> {
  status: ArchiveStatus
  title: string
  questionCount: number
  companyName: string
  archiveId: number
}

function parseStatus(status: ArchiveStatus) {
  switch (status) {
    case 'READY':
      return '대기중'
    case 'COMPLETE':
      return '작성완료'
    case 'FAIL':
      return '작성실패'
    case 'CREATING':
      return '생성중'
    default:
      throw new Error('Invalid status')
  }
}

export const ArchiveCard = ({
  className,
  title,
  status,
  questionCount,
  companyName,
  archiveId,
}: ArchiveCardProps) => {
  const displayStatus = parseStatus(status)

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
          <ArchiveCardMenu archiveId={archiveId} />
        </div>
        <div className="mt-3 h-[84px]">
          <h4 className="line-clamp-3">{title}</h4>
        </div>
        <div className="mt-[20px] text-lg font-semibold">
          예상 면접 질문 <span className="text-green-900">{questionCount}</span>
        </div>
        <div className="flex h-full grow flex-col justify-end">
          <div className="relative">
            <div className="absolute left-0 top-0 h-[6px] w-4/5 rounded-[6.6px] bg-white"></div>
            <div className="h-[6px] rounded-[6.6px] bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
