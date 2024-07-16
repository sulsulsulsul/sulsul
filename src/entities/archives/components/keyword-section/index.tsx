import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArchiveKeyword } from '@/entities/types'
import { cn } from '@/lib/utils'
import { HelpCircle, PlusIcon, X } from 'lucide-react'
import { HTMLAttributes } from 'react'
interface KeywordSectionProps extends HTMLAttributes<HTMLDivElement> {
  keywords: ArchiveKeyword[]
  onDeleteKeyword: (keyword: ArchiveKeyword) => void
}

export const KeywordSection = ({
  className,
  keywords,
  onDeleteKeyword,
  ...props
}: KeywordSectionProps) => {
  return (
    <div className={cn(className)} {...props}>
      <h3 className="flex items-center">
        <span>키워드 노트</span>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <HelpCircle
                strokeWidth={1}
                className="ml-2 -translate-y-px text-gray-400"
              />
            </TooltipTrigger>
            <TooltipContent className="p-3 text-xs" side="right">
              <p>답변 자체를 암기하기보단 핵심 키워드를 정리한 후</p>
              <p>키워드를 중심으로 답변하는 것이 좋아요.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {keywords.map((keyword) => (
          <div
            key={keyword.id}
            className="flex items-center rounded-sm border border-green-500 bg-green-100 px-4 py-2 text-green-500"
          >
            <span className="text-base font-medium">{keyword.content}</span>
            <span
              onClick={() => onDeleteKeyword(keyword)}
              className="cursor-pointer"
            >
              <X size={16} strokeWidth={1.2} className="ml-1 -translate-y-px" />
            </span>
          </div>
        ))}
        <Button className="gap-1 rounded-sm" variant={'outline'} size={'sm'}>
          <PlusIcon
            strokeWidth={1.2}
            className="-translate-y-px text-gray-500"
          />
          {/* TODO: 클릭시 어떻게 되는지 문의 후 적용 */}
          <span>직접 쓰기</span>
        </Button>
      </div>
    </div>
  )
}
