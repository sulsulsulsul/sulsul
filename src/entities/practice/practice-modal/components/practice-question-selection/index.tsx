'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { ArchiveQuestionItem } from '@/entities/types';
import { cn } from '@/lib/utils';

interface QuestionDetailProp {
  index: number;
  questionId: number;
  questionProp: ArchiveQuestionItem;
  finalList: ArchiveQuestionItem[];
  setFinalList: Dispatch<SetStateAction<ArchiveQuestionItem[]>>;
  setSelectedQuestionIds: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeModalQuestionSelection({
  index,
  questionId,
  questionProp,
  finalList,
  setFinalList,
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
