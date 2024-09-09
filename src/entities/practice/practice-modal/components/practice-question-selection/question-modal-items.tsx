'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { ModalQuestionType } from '@/entities/types/question';
import { cn } from '@/lib/utils';

interface QuestionDetailProp {
  questionId: number;
  questionProp: ModalQuestionType;
  finalList: ModalQuestionType[];
  setFinalList: Dispatch<SetStateAction<ModalQuestionType[]>>;
  selectedQuestionIds: number[];
  setSelectedQuestionIds: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeModalQuestionItems({
  questionId,
  questionProp,
  finalList,
  setFinalList,
  selectedQuestionIds,
  setSelectedQuestionIds,
}: QuestionDetailProp) {
  const [checked, setChecked] = useState<CheckedState>(false);

  useEffect(() => {
    finalList.some((item) => item.questionId === questionId)
      ? setChecked(true)
      : setChecked(false);
  }, [finalList]);

  return (
    <div
      className={cn(
        'flex h-[68px] w-full flex-row items-center gap-[12px] border border-gray-100 bg-white border-b-0 pl-[24px] pr-[48px]',
        index === 0 && 'border-t-0',
      )}
    >
      <Checkbox
        className="m-[10px] size-5 p-[2px]"
        checked={checked}
        onCheckedChange={(check) => {
          check
            ? (setSelectedQuestionIds((prev) => [...prev, questionId]),
              setFinalList((prev) => [...prev, questionProp]))
            : (setSelectedQuestionIds((prev) => {
                return prev.filter((item) => {
                  return item !== questionId;
                });
              }),
              setFinalList((prev) => {
                return prev.filter((item) => {
                  return item.questionId !== questionId;
                });
              }));
          setChecked(check);
        }}
      />
      <div className="h-fit w-full">{questionProp.content}</div>
    </div>
  );
}
