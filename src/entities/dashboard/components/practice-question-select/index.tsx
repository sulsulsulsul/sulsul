import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface PracticeQuestionSelectProps extends HTMLAttributes<HTMLDivElement> {
  data: PracticeQuestionSelectItemProps[]
  handleSelect?: (id: string) => void
}

export const PracticeQuestionSelect = ({
  className,
  handleSelect,
  ...props
}: PracticeQuestionSelectProps) => {
  return (
    <div className={cn(className)} {...props}>
      {props.data.map((item, index) => (
        <>
          <PracticeQuestionSelectItem
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

export interface PracticeQuestionSelectItemProps {
  isSelect?: boolean
  id: string
  title: string
  onClick?: (id: string) => void
}

const PracticeQuestionSelectItem = ({
  isSelect,
  id,
  onClick,
  title,
}: PracticeQuestionSelectItemProps) => {
  return (
    <div
      onClick={() => {
        !isSelect && onClick?.(id)
      }}
      className={cn(
        'flex items-center transition px-3 py-5 justify-between gap-2',
        {
          'hover:bg-gray-50 cursor-pointer': !isSelect,
        },
      )}
    >
      <div className="flex items-center gap-2">
        <Checkbox checked={isSelect} className="size-5 -translate-y-px" />
        <div>
          <p
            className={cn('text-base font-semibold', {
              'text-blue-500': isSelect,
            })}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}
