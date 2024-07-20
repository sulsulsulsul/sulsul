import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { SelectJobTypeModal } from './select-job-type-button'

interface FormActionProps extends HTMLAttributes<HTMLDivElement> {
  deleteContents: () => void
}

export const FormAction = ({
  className,
  deleteContents,
  ...props
}: FormActionProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex gap-2">
        <Button
          className="basis-[117px] text-gray-600"
          variant={'outline'}
          onClick={deleteContents}
        >
          <Image
            src="/images/icons/icon-redo.svg"
            width={24}
            height={24}
            alt="icon"
          />
          초기화
        </Button>
        <SelectJobTypeModal />
      </div>
    </div>
  )
}
