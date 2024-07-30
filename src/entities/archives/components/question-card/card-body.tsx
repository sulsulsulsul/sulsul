import { HTMLAttributes } from 'react'
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
}

export const CardBody = ({
  className,
  question,
  questionId,
  ...props
}: CardBodyProps) => {
  const { mutate: updateAnswerMutation } = useUpdateAnswer()

  const { feedback } = useFeedback(questionId)

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {!question.isAnswered && (
        <QuestionAnswerForm
          onSubmit={(data) => {
            updateAnswerMutation({ questionId: question.questionId, ...data })
          }}
        />
      )}
      {question.isAnswered && (
        <QuestionAnswer
          onCreateKeywordNote={() => {
            // TODO: 구현
          }}
          answer={question.answer}
          keywords={question.keywords}
        />
      )}

      <KeywordSection
        keywords={question.keywords}
        onDeleteKeyword={() => {
          {
            /* TODO: 구현 */
          }
        }}
        className="mt-6"
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold">내 답변 피드백</h3>
        <div className="mt-2">
          {(!feedback || !feedback?.content) && (
            <FeedbackSectionIdle questionId={questionId} />
          )}

          {feedback?.content && (
            <FeedbackSectionComplete
              goodFeedback={feedback?.content}
              badFeedback={feedback?.content}
            />
          )}
        </div>
      </div>
    </div>
  )
}
