'use client'

import { HTMLAttributes } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import {
  QuestionAnswerFormValues,
  useQuestionAnswerForm,
} from '../../hooks/use-question-answer-form'

interface QuestionAnswerFormProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  onSubmit: (data: QuestionAnswerFormValues) => void
}

export const QuestionAnswerForm = ({
  className,
  onSubmit,
  ...props
}: QuestionAnswerFormProps) => {
  const form = useQuestionAnswerForm()
  const answerLength = form.watch('answer')?.length

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <Form {...form}>
      <div className={cn('relative', className)} {...props}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      className="relative resize-none rounded-base p-4"
                      rows={11}
                      {...field}
                    />
                    {!answerLength && (
                      <div
                        onClick={() => form.setFocus('answer')}
                        className="absolute left-5 top-5 z-10 cursor-default text-gray-500"
                      >
                        <h2 className="text-base font-semibold">
                          상황 - 액션 - 결과 순으로 답변을 구성하면 좋아요
                        </h2>
                        <div className="relative h-fit text-base">
                          <p className="flex items-center gap-2">
                            <span className="relative flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                              1
                              <div className="absolute left-1/2 top-full h-[7px] -translate-x-1/2 border border-gray-200" />
                            </span>
                            구체적으로 언제, 어떤 상황이었나요?
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="relative flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                              2
                              <div className="absolute left-1/2 top-full h-[7px] -translate-x-1/2 border border-gray-200" />
                            </span>
                            어떻게 행동했나요?
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                              3
                            </span>
                            그 결과는 어땠나요?
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-1/2 flex w-[calc(100%-32px)] translate-x-1/2 items-end justify-between">
                      <div className="flex flex-col gap-px">
                        <div>
                          <span>{answerLength ?? 0}</span>
                          <span className="text-gray-500">/500자</span>
                        </div>
                        <FormMessage />
                      </div>
                      <div className="flex gap-1">
                        <Button size={'sm'}>저장하기</Button>
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
