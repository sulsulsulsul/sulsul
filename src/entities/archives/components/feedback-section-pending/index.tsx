import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { HTMLAttributes } from 'react'
interface FeedbackSectionPendingProps extends HTMLAttributes<HTMLDivElement> {}

export const FeedbackSectionPending = ({
  className,
  ...props
}: FeedbackSectionPendingProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
        <div className="animate-spin">
          <Loader2 />
        </div>
      </div>
    </div>
  )
}
