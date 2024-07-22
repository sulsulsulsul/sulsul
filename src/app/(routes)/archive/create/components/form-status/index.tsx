'use client'

import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { useCreateArchiveFormContext } from '../../hooks/use-create-archive-form'
import { IdleStatus } from './status/idle'
import { ValidStatus } from './status/valid'
interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {}

export const FormStatus = ({
  className,
  ...props
}: InterviewQuestionsProps) => {
  const { form } = useCreateArchiveFormContext()

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
      <div className="mt-[18px] size-full">
        {!isFormValid && <IdleStatus />}
        {isFormValid && <ValidStatus />}
      </div>
    </div>
  )
}
