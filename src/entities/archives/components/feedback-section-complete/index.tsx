import { HTMLAttributes, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCreateFeedback } from '@/entities/feedbacks/hooks/use-create-feedback'
import { cn } from '@/lib/utils'

import { FeedbackSectionPending } from '../feedback-section-pending'
interface FeedbackSectionCompleteProps extends HTMLAttributes<HTMLDivElement> {
  goodFeedback: string
  badFeedback: string
  isAnswerChanged: boolean
  handleAnswerChanged: () => void
  questionId: number
}

export const FeedbackSectionComplete = ({
  className,
  goodFeedback: good,
  badFeedback: bad,
  isAnswerChanged,
  handleAnswerChanged,
  questionId,
  ...props
}: FeedbackSectionCompleteProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: createFeedbackMutation } = useCreateFeedback()

  const handleCreateFeedback = () => {
    if (isAnswerChanged) {
      setIsLoading(true)
      createFeedbackMutation(
        { questionId },
        {
          onSuccess: () => {
            handleAnswerChanged()
            setTimeout(() => {
              setIsLoading(false)
            }, 3000)
          },
        },
      )
    }
  }

  return (
    <div className={cn(className)} {...props}>
      <div className="flex flex-col justify-center rounded-base bg-gray-50 p-5 ">
        {isLoading ? (
          <FeedbackSectionPending />
        ) : (
          <>
            <div>
              <p className="mb-1 text-xs font-semibold text-blue-500">좋은점</p>
              <p>{good}</p>
            </div>
            <div className="mt-5">
              <p className="mb-1 text-xs font-semibold text-red-500">개선점</p>
              <p>{bad}</p>
            </div>
            <div className="mt-4 text-right" onClick={handleCreateFeedback}>
              <Button size="sm" disabled={!isAnswerChanged}>
                <span className="text-base font-semibold">다시 받기</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
