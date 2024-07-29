import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface ContentLengthProps extends HTMLAttributes<HTMLDivElement> {}

export const ContentLength = ({ className, ...props }: ContentLengthProps) => {
  const { form } = useCreateArchiveFormContext()

  const contentLength = form.watch('resume')?.length || 0

  return (
    <div className={cn(className)} {...props}>
      <div className="text-2xl font-semibold">
        <span className="text-gray-600">{contentLength}</span>
        <span className="text-gray-400">/2000자</span>
      </div>
    </div>
  )
}
