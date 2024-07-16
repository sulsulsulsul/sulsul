import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'
interface PracticeArchiveSelectProps extends HTMLAttributes<HTMLDivElement> {
  data: PracticeArchiveSelectItemProps[]
  handleSelect?: (id: string) => void
}

export const PracticeArchiveSelect = ({
  className,
  handleSelect,
  ...props
}: PracticeArchiveSelectProps) => {
  return (
    <div className={cn(className)} {...props}>
      {props.data.map((item, index) => (
        <>
          <PracticeArchiveSelectItem
            onClick={handleSelect}
            key={index}
            {...item}
          />
          {index !== props.data.length - 1 && <Separator />}
        </>
      ))}
    </div>
  )
}

export interface PracticeArchiveSelectItemProps {
  isSelect?: boolean
  id: string
  title: string
  company?: string
  onClick?: (id: string) => void
}

const PracticeArchiveSelectItem = ({
  isSelect,
  id,
  onClick,
  title,
  company,
}: PracticeArchiveSelectItemProps) => {
  return (
    <div
      onClick={() => {
        !isSelect && onClick?.(id)
      }}
      className={cn(
        'group flex items-center transition pl-6 pr-7 py-3 justify-between gap-2',
        {
          'bg-blue-100': isSelect,
        },
        {
          'hover:bg-gray-50 cursor-pointer': !isSelect,
        },
      )}
    >
      <div className="flex items-start gap-4">
        <Checkbox checked={isSelect} className="size-5 translate-y-px" />
        <div>
          <p
            className={cn('text-base font-semibold', {
              'text-blue-500': isSelect,
            })}
          >
            {title}
          </p>
          <Badge
            className="mt-1 text-2xs"
            variant={isSelect ? 'default' : 'secondary'}
          >
            {company}
          </Badge>
        </div>
      </div>
      <ChevronRightIcon
        className={cn(
          'size-6 opacity-0 transition-opacity group-hover:opacity-100',
          {
            'text-gray-500': !isSelect,
            'text-blue-500 opacity-100': isSelect,
          },
        )}
      />
    </div>
  )
}
