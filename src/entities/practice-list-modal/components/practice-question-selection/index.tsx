'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'

import { Checkbox } from '@/components/ui/checkbox'
import { ArchiveQuestionItem } from '@/entities/types'

interface QuestionDetail {
  content: string
  resetQuestion: boolean
  questionId: number
  selectAll: CheckedState
  questionProp: ArchiveQuestionItem
  setPracticeQuestion: Dispatch<SetStateAction<ArchiveQuestionItem[]>>
}

//예상 면접질문
export default function QuestionSelection({
  content,
  resetQuestion,
  setPracticeQuestion,
  selectAll,
  questionId,
  questionProp,
}: QuestionDetail) {
  const [checked, setChecked] = useState<CheckedState>(false)

  useEffect(() => {
    resetQuestion && setChecked(false)
    selectAll ? setChecked(true) : setChecked(false)
    selectAll && setPracticeQuestion((prev) => [...prev, questionProp])
  }, [resetQuestion, selectAll, setPracticeQuestion])

  return (
    <div className="flex h-[68px] w-full flex-row items-center gap-[12px] border border-gray-100 bg-white py-[24px] pl-[24px] pr-[48px]">
      <Checkbox
        className="m-[10px] size-5 p-[2px]"
        checked={checked}
        onCheckedChange={(check) => {
          check
            ? setPracticeQuestion((prev) => [...prev, questionProp])
            : setPracticeQuestion((prev) => {
                return prev.filter((item) => {
                  return item.questionId !== questionId
                })
              })
          setChecked(check)
        }}
      />
      <div className="truncate">{content}</div>
    </div>
  )
}
