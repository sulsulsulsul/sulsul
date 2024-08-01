import { HTMLAttributes, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useFeedback } from '@/entities/feedbacks/hooks/use-feedback'
import { useUpdateAnswer } from '@/entities/questions/hooks/use-update-answer'
import { ArchiveQuestionItem } from '@/entities/types'
import { cn } from '@/lib/utils'

import { FeedbackSectionComplete } from '../feedback-section-complete'
import { FeedbackSectionIdle } from '../feedback-section-idle'
import { KeywordSection } from '../keyword-section'
import { QuestionAnswer } from '../question-answer'
import { QuestionAnswerForm } from '../question-answer-form'
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  question: ArchiveQuestionItem
  questionId: number
  isAnswered: boolean
  archiveId: number
}

export const CardBody = ({
  className,
  question,
  questionId,
  isAnswered,
  archiveId,
  ...props
}: CardBodyProps) => {
  const { answer } = question
  const [isAnswerChanged, setIsAnswerChanged] = useState(false)

  const { mutate: updateAnswerMutation } = useUpdateAnswer()

  const { feedback } = useFeedback(questionId)
  const queryClient = useQueryClient()

  const onSubmit = (data: { answer: string }) => {
    updateAnswerMutation(
      { questionId: question.questionId, ...data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['archive', archiveId],
          })
          setIsAnswerChanged(true)
        },
      },
    )
  }

  const handleAnswerChanged = () => {
    setIsAnswerChanged(false)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {!question.isAnswered && <QuestionAnswerForm onSubmit={onSubmit} />}
      {question.isAnswered && (
        <QuestionAnswer
          onSubmit={onSubmit}
          answer={answer}
          keywords={question.keywords}
          questionId={questionId}
        />
      )}

      <KeywordSection questionId={questionId} className="mt-6" />

      <div className="mt-6">
        <h3 className="text-lg font-semibold">내 답변 피드백</h3>
        <div className="mt-2">
          {(!feedback || !feedback?.content) && (
            <FeedbackSectionIdle
              questionId={questionId}
              isAnswered={isAnswered}
              handleAnswerChanged={handleAnswerChanged}
            />
          )}

          {feedback?.content && (
            <FeedbackSectionComplete
              goodFeedback={feedback?.goodPoint}
              badFeedback={feedback?.improvePoint}
              isAnswerChanged={isAnswerChanged}
              handleAnswerChanged={handleAnswerChanged}
              questionId={questionId}
            />
          )}
        </div>
      </div>
    </div>
  )
}
