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
            className="absolute  left-[2.5%] top-[-10px] w-[95%] rounded-md bg-blue-500 p-4 text-white"
          ></motion.div>
        );
      })}

      <Button
        onClick={handleCorrect}
        variant={'outline'}
        className="relative h-[158px] w-full flex-col gap-1 border-gray-200 bg-white shadow-base"
      >
        {children}
        <span className="text-gray-300">{questions.length}</span>
      </Button>
    </div>
  );
};
