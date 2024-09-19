import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { PracticingListType } from '@/entities/types/question';
import { cn } from '@/lib/utils';

interface AnswerButtonProps extends HTMLAttributes<HTMLDivElement> {
  questions: PracticingListType[];
  handleCorrect: () => void;
}

export const AnswerButton = ({
  className,
  questions,
  handleCorrect,
  children,
  ...props
}: AnswerButtonProps) => {
  return (
    <div className={cn('relative size-full', className)} {...props}>
      {questions.map((item, i) => {
        return (
          <motion.div
            transition={{
              layout: { duration: 0.2 },
            }}
            key={item.questionId}
            layoutId={item.questionId.toString()}
            className="absolute  left-[2.5%] top-[-10px] w-[95%] rounded-md bg-blue-500 p-4 text-white mobile:rounded-xl"
          ></motion.div>
        );
      })}

      <Button
        onClick={handleCorrect}
        variant={'outline'}
        className="relative h-[158px] w-full flex-col gap-1 rounded-md border-gray-200 bg-white shadow-base mobile:h-[80px] mobile:rounded-xl"
      >
        {children}
        <span
          className={cn(
            ' text-3xl mobile:text-base',
            questions.length === 0 ? 'text-gray-300' : 'text-gray-700',
          )}
        >
          {questions.length}
        </span>
      </Button>
    </div>
  );
};
