'use client';
import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
interface UserAnswerProps extends HTMLAttributes<HTMLDivElement> {
  data: string;
  onUpdate: () => void;
}

export const UserAnswer = ({
  className,
  onUpdate,
  ...props
}: UserAnswerProps) => {
  return (
    <div
      className={cn('relative rounded-base border pt-4 px-4 pb-20', className)}
      {...props}
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <p className="user-answer">{props.data}</p>
      <div className="absolute bottom-4 right-1/2 flex w-[calc(100%-32px)] translate-x-1/2 items-end justify-between">
        <span>0/500자</span>
        <Button onClick={onUpdate} size={'sm'}>
          답변 수정
        </Button>
      </div>
    </div>
  );
};
