'use client';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { KeywordSet } from '@/entities/archives/components/keyword-section/keyword';

import helpCircle from '/public/images/icons/help-circle.svg';

const Keyword = () => {
  return (
    <div className={'mt-6'}>
      <div className="flex items-center">
        <span className="font-semibold">키워드 노트</span>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <Image
                src={helpCircle}
                alt="도움말 아이콘"
                className="ml-1"
                width={20}
                height={20}
              />
            </TooltipTrigger>
            <TooltipContent className="p-3 text-xs" side="right">
              <p>답변 자체를 암기하기보단 핵심 키워드를 정리한 후</p>
              <p>키워드를 중심으로 답변하는 것이 좋아요.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <KeywordSet
          // keywords={keywords}
          questionId={1}
        />
        <Input
          className="w-fit gap-2 rounded-sm border border-gray-300 bg-white text-base font-medium text-black"
          placeholder="+ 직접 쓰기"
          // value={inputValue}
          // onChange={handleInputChange}
          // onKeyDown={handleCreateKeyword}
          // ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Keyword;
