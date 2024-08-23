'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { ArchiveQuestionItem } from '@/entities/types';
import {
  ModalQuestionType,
  QuestionDetailType,
} from '@/entities/types/question';

interface QuestionDetail {
  resetQuestion: boolean;
  questionId: number;
  selectAll: CheckedState;
  questionProp: ModalQuestionType;
  setFinalQuestions: Dispatch<SetStateAction<ModalQuestionType[]>>;
}

export default function QuestionSelection({
  resetQuestion,
  setFinalQuestions,
  selectAll,
  questionId,
  questionProp,
}: QuestionDetail) {
  const [checked, setChecked] = useState<CheckedState>(false);

  useEffect(() => {
    resetQuestion && setChecked(false);
    selectAll &&
      (setChecked(true),
      setFinalQuestions((prev) => {
        return prev.some((item) => item.questionId === questionId)
          ? prev
          : [...prev, questionProp];
      }));
  }, [resetQuestion, selectAll]);

  return (
    <div className="flex h-[68px] w-full flex-row items-center gap-[12px] border border-gray-100 bg-white py-[24px] pl-[24px] pr-[48px]">
      <Checkbox
        className="m-[10px] size-5 p-[2px]"
        checked={checked}
        onCheckedChange={(check) => {
          check
            ? setFinalQuestions((prev) => [...prev, questionProp])
            : setFinalQuestions((prev) => {
                return prev.filter((item) => {
                  return item.questionId !== questionId;
                });
              });
          setChecked(check);
        }}
      />
      <div className="truncate">{questionProp.content}</div>
    </div>
  );
}
