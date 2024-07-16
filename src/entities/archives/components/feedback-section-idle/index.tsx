import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface FeedbackSectionIdleProps extends HTMLAttributes<HTMLDivElement> {
  handleCreateFeedback: () => void
}

export const FeedbackSectionIdle = ({
  className,
  handleCreateFeedback,
  ...props
}: FeedbackSectionIdleProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
        <p>피드백 받기 버튼을 누르면</p>
        <p>내 답변에 대한 피드백을 받을 수 있어요!</p>
        <div className="mt-4">
          <Button size={'sm'} onClick={handleCreateFeedback}>
            <span className="text-base font-semibold">피드백 받기</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
