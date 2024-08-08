import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { ArchiveStatus } from '@/entities/types'
import { cn } from '@/lib/utils'

import { ActionButtons } from './action-buttons'

interface ArchiveContentProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  resume: string
  companyName: string
  status: ArchiveStatus
}

export const ArchiveContent = ({
  className,
  title,
  resume,
  companyName,
  status,
  ...props
}: ArchiveContentProps) => {
  return (
    <div className={cn('h-full', className)} {...props}>
      <h2
        className={cn('flex items-center gap-1 text-4xl font-bold', className)}
      >
        <Image
          src="/images/icons/etc-pencil.svg"
          width={32}
          height={32}
          alt="icon"
        />
        <span>내 자기 소개서</span>
      </h2>
      <div className="mt-[18px] size-full rounded-md bg-white p-[28px]">
        <div className="flex size-full flex-col justify-between gap-3">
          <div className="w-fit rounded-sm bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
            {companyName}
          </div>
          <div>
            <h3 className="w-full text-2xl font-semibold">{title}</h3>
          </div>
          <div className="min-h-[400px] w-full">
            <div className="overflow-hidden text-balance break-words">
              {resume}
            </div>
          </div>
        </div>
        <div className="text-2xs font-semibold">
          <span className="text-gray-600">{resume.length}</span>
          <span className="text-gray-400">/2000자</span>
        </div>
        <ActionButtons status={status} className="mt-4" />
      </div>
    </div>
  )
}
