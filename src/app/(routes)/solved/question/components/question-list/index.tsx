import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const QuestionList = ({ className }: QuestionListProps) => {
  return (
    <>
      <div className={cn('h-full', className)}>
        <div className="mt-[18px] size-full rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
          QuestionList
        </div>
      </div>
    </>
  );
};

export default QuestionList;
