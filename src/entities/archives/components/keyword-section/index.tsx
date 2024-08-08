import {
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { HelpCircle } from 'lucide-react';

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
interface KeywordSectionProps extends HTMLAttributes<HTMLDivElement> {
  questionId: number;
}

export const KeywordSection = ({
  className,
  questionId,
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
      { questionId, content: newKeyword },
      {
        onSuccess: () => {
          setInputValue(() => '');
          queryClient.invalidateQueries({ queryKey: ['keywords', questionId] });
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
        <span>키워드 노트</span>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <HelpCircle
                strokeWidth={1}
                className="ml-2 -translate-y-px text-gray-400"
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
        <KeywordSet keywords={keywords} questionId={questionId} />
        <Input
          className="w-fit gap-1 rounded-sm border border-gray-300 text-base font-medium text-black"
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
