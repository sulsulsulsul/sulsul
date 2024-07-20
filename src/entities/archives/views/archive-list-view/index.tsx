import { APP_ROUTES } from '@/config/constants/app-routes'
import Image from 'next/image'
import Link from 'next/link'
import React, { HTMLAttributes, useState } from 'react'
import { ArchiveCard } from '../../components/archive-card'
import { useArchives } from '../../hooks'
import SelectDropdown from '@/app/(routes)/archive/(list)/components/select-dropdown'
import { IdleStatus } from '@/app/(routes)/archive/create/components/form-status/status/idle'
import { Button } from '@/components/ui/button'
import arrowUpRight from '../../../../../public/images/icons/icon-arrow_up_right.svg'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/shared/loader'
import { ArchiveListItemDTO } from '@/entities/types'

interface ArchiveListViewProps extends HTMLAttributes<HTMLDivElement> {}

export const ArchiveListView = ({ className }: ArchiveListViewProps) => {
  const { archives, isError, isLoading, isSuccess } = useArchives()
  const [sortType, setSortType] = useState<'recent' | 'old'>('recent')

  const router = useRouter()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!isSuccess) {
    return null
  }

  const onChangeSortType = (value: 'recent' | 'old') => {
    setSortType(value)
  }

  if (archives?.length === 0) {
    return (
      <main>
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-4xl font-bold">
            <Image
              width={32}
              height={32}
              src={'/images/icons/etc-folder.svg'}
              alt="etc folder"
            />
            <h2>내 면접 질문 및 답변</h2>
          </div>
          <SelectDropdown onChangeSortType={onChangeSortType} />
        </div>
        <div className="mt-40">
          <IdleStatus
            firstLine="내 자소서를 입력하고"
            secondLine="면접 예상질문을 생성해보세요!"
          />
          <div
            className="mt-20 flex w-full items-center justify-center"
            onClick={() => router.push('/archive/create')}
          >
            <Button size="sm" className="px-8 py-4 text-[16px]">
              면접 예상질문 생성하러 가기
              <Image src={arrowUpRight} alt="대각선화살표" />
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const copyArchives = archives && JSON.parse(JSON.stringify(archives))
  const archiveLists =
    sortType === 'recent' ? archives : copyArchives?.reverse()

  return (
    <main>
      <div className="flex justify-between">
        <div className="flex items-center gap-1 text-4xl font-bold">
          <Image
            width={32}
            height={32}
            src={'/images/icons/etc-folder.svg'}
            alt="etc folder"
          />
          <h2>내 면접 질문 및 답변 </h2>
          <span className="text-blue-500">{archives?.length}</span>
        </div>
        <SelectDropdown onChangeSortType={onChangeSortType} />
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-6">
          {archiveLists?.map((archive: ArchiveListItemDTO) => (
            <Link
              key={archive.archiveId}
              href={APP_ROUTES.archiveDetail(archive.archiveId)}
            >
              <ArchiveCard key={archive.archiveId} {...archive} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
