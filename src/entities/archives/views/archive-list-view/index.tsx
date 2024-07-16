import { APP_ROUTES } from '@/config/constants/app-routes'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { ArchiveCard } from '../../components/archive-card'
import { useArchives } from '../../hooks'
interface ArchiveListViewProps extends HTMLAttributes<HTMLDivElement> {}

export const ArchiveListView = ({ className }: ArchiveListViewProps) => {
  const { archives, isError, isLoading, isSuccess } = useArchives()

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
      <div className="flex items-center gap-1 text-4xl font-bold">
        <Image
          width={32}
          height={32}
          src={'/images/icons/etc-folder.svg'}
          alt="etc folder"
        />
        <h2>내 면접 질문 및 답변</h2>
        <span className="text-blue-500">{archives?.length}</span>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-6">
          {archives!.map((archive) => (
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
