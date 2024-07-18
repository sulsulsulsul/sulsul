import { ArchiveKeyword } from '@/entities/types'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { KeywordSet } from '../keyword-section/keyword'
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  content: string
  keywords: ArchiveKeyword[]
  isAnswered: boolean
  isAccodionOpen: boolean
}

export const CardHeader = ({
  className,
  content,
  keywords,
  isAnswered,
  isAccodionOpen,
  ...props
}: CardHeaderProps) => {
  const answeredIconClass = isAnswered ? 'bg-blue-500' : 'bg-gray-200'
  return (
    <div className={cn(className)} {...props}>
      <div className="flex w-full items-center justify-start gap-2 border-none p-0 py-2">
        <div
          className={`size-[9.6px] min-w-[9.6px] rounded-full ${answeredIconClass}`}
        />
        <p className="grow text-left text-gray-700">{content}</p>
      </div>
      {!isAccodionOpen && (
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <KeywordSet keywords={keywords} isHeader />
        </div>
      )}
    </div>
  )
}
