import { APP_ROUTES } from '@/config/constants/app-routes'
import Image from 'next/image'
import Link from 'next/link'
import React, { HTMLAttributes, useState } from 'react'
import { ArchiveCard } from '../../components/archive-card'
import { useArchives } from '../../hooks'
import SelectDropdown from '@/app/(routes)/archive/(list)/components/select-dropdown'
interface ArchiveListViewProps extends HTMLAttributes<HTMLDivElement> {}

export const ArchiveListView = ({ className }: ArchiveListViewProps) => {
  const { archives, isError, isLoading, isSuccess } = useArchives()
  const [isRecent, setIsRecent] = useState(true)

  const copyArchives = archives && JSON.parse(JSON.stringify(archives))
  const archiveLists = isRecent ? archives : copyArchives?.reverse()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!isSuccess) {
    return null
  }

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
        <SelectDropdown setIsRecent={setIsRecent} />
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-6">
          {archiveLists!.map((archive: any) => (
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
