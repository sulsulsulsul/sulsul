import { HTMLAttributes } from 'react'

import { Button } from '@/components/ui/button'
import { useCreateFeedback } from '@/entities/feedbacks/hooks/use-create-feedback'
import { cn } from '@/lib/utils'
interface FeedbackSectionIdleProps extends HTMLAttributes<HTMLDivElement> {
  questionId: number
  isAnswered: boolean
}

export const FeedbackSectionIdle = ({
  className,
  questionId,
  isAnswered,
  ...props
}: FeedbackSectionIdleProps) => {
  const { mutate: createFeedbackMutation } = useCreateFeedback()

  const handleCreateFeedback = () => {
    createFeedbackMutation({ questionId })
  }

  return (
    <div className={cn(className)} {...props}>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
        <p>피드백 받기 버튼을 누르면</p>
        <p>내 답변에 대한 피드백을 받을 수 있어요!</p>
        <div className="mt-4">
          <Button
            size="sm"
            onClick={handleCreateFeedback}
            disabled={!isAnswered}
          >
            <span className="text-base font-semibold">피드백 받기</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
