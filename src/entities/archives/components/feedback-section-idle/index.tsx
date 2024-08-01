import { HTMLAttributes, useState } from 'react'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { useCreateFeedback } from '@/entities/feedbacks/hooks/use-create-feedback'
import { ArchiveFeedback } from '@/entities/types'
import { cn } from '@/lib/utils'

import { FeedbackSectionPending } from '../feedback-section-pending'

interface FeedbackSectionIdleProps extends HTMLAttributes<HTMLDivElement> {
  questionId: number
  isAnswered: boolean
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ArchiveFeedback, Error>>
}

export const FeedbackSectionIdle = ({
  className,
  questionId,
  isAnswered,
  refetch,
  ...props
}: FeedbackSectionIdleProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: createFeedbackMutation } = useCreateFeedback()

  const handleCreateFeedback = () => {
    if (isAnswered) {
      setIsLoading(true)
      createFeedbackMutation(
        { questionId },
        {
          onSuccess: () => {
            refetch()
            setTimeout(() => {
              refetch()
              setIsLoading(false)
            }, 5000)
          },
        },
      )
    }
  }

  return (
    <div className={cn(className)} {...props}>
      <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
        {isLoading ? (
          <FeedbackSectionPending />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
