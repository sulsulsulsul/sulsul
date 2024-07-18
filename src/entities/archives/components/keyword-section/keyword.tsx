import { ArchiveKeyword } from '@/entities/types'
import { X } from 'lucide-react'

interface KeywordProps {
  keywords: ArchiveKeyword[]
  isHeader: boolean
}

export const KeywordSet = ({ keywords, isHeader }: KeywordProps) => {
  return keywords.map((keyword) => (
    <div
      key={keyword.id}
      className="flex items-center rounded-sm border border-green-500 bg-green-100 px-4 py-2 text-green-500"
    >
      <span className="text-base font-medium">{keyword.content}</span>
      {!isHeader && (
        <span
          // onClick={() => onDeleteKeyword(keyword)}
          className="cursor-pointer"
        >
          <X size={16} strokeWidth={1.2} className="ml-1 -translate-y-px" />
        </span>
      )}
    </div>
  ))
}

KeywordSet.displayName = 'KeywordSet'
