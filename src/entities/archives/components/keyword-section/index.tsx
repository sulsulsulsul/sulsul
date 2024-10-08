import {
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCreateKeyword } from '@/entities/keywords/hooks/use-create-keyword';
import { useKeywords } from '@/entities/keywords/hooks/use-get-keyword';
import { cn } from '@/lib/utils';

import { KeywordSet } from './keyword';

import helpCircle from '/public/images/icons/help-circle.svg';
interface KeywordSectionProps extends HTMLAttributes<HTMLDivElement> {
  questionId: number;
  type?: string;
  challengeKeywordData?: [
    {
      keywordId: number;
      content: string;
    },
  ];
  accessToken?: string;
  category?: string;
  challengeQuestionId?: number;
}

export const KeywordSection = ({
  className,
  questionId,
  type = '',
  challengeKeywordData,
  accessToken,
  category = '',
  challengeQuestionId,
  ...props
}: KeywordSectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createKeywordMutation } = useCreateKeyword();
  const { keywords } = useKeywords(questionId);
  const queryClient = useQueryClient();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim() === '') return;

    const newKeyword = inputValue.trim();

    createKeywordMutation(
      { questionId, content: newKeyword, type: type },
      {
        onSuccess: () => {
          setInputValue(() => '');
          queryClient.invalidateQueries({
            queryKey: ['keywords', questionId],
          });
          queryClient.invalidateQueries({
            queryKey: ['challenge', 'questionList', category, accessToken],
          });
        },
      },
    );
  };

  const handleCreateKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  return (
    <div className={cn(className)} {...props}>
      <h3 className="flex items-center">
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
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <KeywordSet
          keywords={keywords}
          questionId={questionId}
          challengeKeywordData={challengeKeywordData}
          challengeQuestionId={challengeQuestionId!}
          category={category}
          accessToken={accessToken!}
        />
        <Input
          className="w-fit gap-1 rounded-sm border border-gray-300 bg-white text-base font-medium text-black"
          placeholder="+ 직접 쓰기"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleCreateKeyword}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
