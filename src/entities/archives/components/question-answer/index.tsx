'use client'

import { useEffect, useRef, useState } from 'react'
import { HighlightMenu } from 'react-highlight-menu'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ArchiveKeyword } from '@/entities/types'
import { cn } from '@/lib/utils'

import { useQuestionAnswerForm } from '../../hooks/use-question-answer-form'
import { KeywordNote } from './keyword-note'

interface QuestionAnswerProps {
  className?: string
  answer: string
  keywords: ArchiveKeyword[]
  questionId: number
  isAnswerChanged: boolean
  onSubmit: (data: { answer: string }) => void
}

export const QuestionAnswer = ({
  className,
  answer,
  keywords,
  questionId,
  isAnswerChanged,
  onSubmit,
  ...props
}: QuestionAnswerProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useQuestionAnswerForm()
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      answer: answer,
    },
  })
  const localAnswer = watch('answer')

  useEffect(() => {
    setValue('answer', answer)
  }, [answer, setValue])

  useEffect(() => {
    setIsEditing(localAnswer !== answer)
  }, [localAnswer, answer])

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({ answer: data.answer })
    setIsEditing(false)
  })

  return (
    <Form {...form}>
      <div className={cn('relative', className)} {...props}>
        <form onSubmit={onFormSubmit}>
          <FormField
            control={control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={`relative rounded-base border p-4 ${isFocused ? `border-blue-600` : `border-gray-300`}`}
                  >
                    <div className="user-answer">
                      <HighlightWithinTextarea
                        ref={textareaRef}
                        value={field.value}
                        highlight={keywords.map((keyword) => {
                          return {
                            highlight: keyword.content,
                            className: 'bg-green-300',
                          }
                        })}
                        onChange={(value) => field.onChange(value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    </div>

                    <HighlightMenu
                      target=".user-answer"
                      allowedPlacements={['top', 'bottom']}
                      styles={{
                        boxShadow: '0px 4px 24px rgba(26, 33, 81, 0.24)',
                        borderRadius: '10px',
                        border: 'none',
                      }}
                      menu={({
                        selectedText = '',
                        setClipboard,
                        setMenuOpen,
                      }) => (
                        <KeywordNote
                          selectedText={selectedText}
                          setClipboard={setClipboard}
                          setMenuOpen={setMenuOpen}
                          questionId={questionId}
                        />
                      )}
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex flex-col gap-px text-2xs">
                        <div className="absolute bottom-4">
                          <span className="text-gray-600">
                            {field.value?.length ?? 0}
                          </span>
                          <span className="text-gray-400">/500자</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" type="submit" disabled={!isEditing}>
                          수정하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  )
}
