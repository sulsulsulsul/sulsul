'use client'

import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { PendingStatus } from '@/entities/archives/components/interview-questions/status/pending'
import { cn } from '@/lib/utils'

import { useCreateArchiveFormContext } from '../../hooks/use-create-archive-form'
import { usePendingStatus } from '../../hooks/use-pending-status'
import { IdleStatus } from './status/idle'
import { ValidStatus } from './status/valid'
interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {}

export const FormStatus = ({
  className,
  ...props
}: InterviewQuestionsProps) => {
  const { isPending } = usePendingStatus()

  const { form } = useCreateArchiveFormContext()

  const isSubmitting = form.formState.isSubmitting
  const isFormValid = form.formState.isValid

  return (
    <div className={cn(className)} {...props}>
      <h2 className="flex items-center gap-1 text-4xl font-bold">
        <Image
          src="/images/icons/etc-speech.svg"
          width={32}
          height={32}
          alt="icon"
        />
        <span>면접 예상질문</span>
      </h2>
      <div className="mt-[18px] size-full rounded-md bg-white shadow-base">
        {!isFormValid && !isSubmitting && !isPending && (
          <IdleStatus
            firstLine="내 자소서에선 어떤 질문이 나올까요?"
            secondLine="왼쪽에서 내용을 입력해보세요!"
          />
        )}
        {(isSubmitting || isPending) && <PendingStatus />}
        {isFormValid && !isSubmitting && !isPending && <ValidStatus />}
      </div>
    </div>
  )
}
