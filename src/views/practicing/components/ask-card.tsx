import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { ArchiveQuestionItem } from '@/entities/types';
import { ModalQuestionDetail } from '@/entities/types/question';
import { cn } from '@/lib/utils';
interface AskCardProps extends HTMLAttributes<HTMLDivElement> {
  question: ModalQuestionDetail;
  remainingQuestions: number;
}

export const AskCard = ({
  className,
  question,
  remainingQuestions,
  ...props
}: AskCardProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-md bg-blue-500 px-[120px] text-white mobile:px-6">
        <h2 className="text-center text-4xl font-bold mobile:text-xl mobile:font-semibold">
          {question.content}
        </h2>
        <div className="absolute right-9 top-8 flex items-center gap-1 text-xl font-semibold mobile:text-xs">
          <span className="opacity-60">남은 문항</span>
          <span>{remainingQuestions}</span>
        </div>
        <div className="absolute left-1/2 top-0 h-[162px] w-[198px] -translate-x-1/2 -translate-y-1/2 mobile:size-[170px]">
          <Image
            src={'/images/character-interviewer.svg'}
            alt="interviewer character"
            width={170}
            height={170}
          />
        </div>
      </div>
    </div>
  );
};
