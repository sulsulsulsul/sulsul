'use client';

import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface PracticeStartCardProps extends HTMLAttributes<HTMLDivElement> {
  nickname: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const PracticeStartCard = ({
  className,
  nickname,
  setModalOpen,
  ...props
}: PracticeStartCardProps) => {
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-4xl font-bold">
        <p>
          <span className="text-blue-500">{nickname}</span>님,
        </p>
        <p>지피지기면 백전백승이에요!</p>
      </h2>
      <div className="flex items-center justify-center">
        <Image
          className="animate-cheering-animation"
          src={'/images/character-cheering.svg'}
          alt="cheering character"
          width={162}
          height={145}
        />
      </div>
      <Button className="w-full" onClick={() => setModalOpen(true)}>
        실전 연습하기
      </Button>
    </div>
  );
};
