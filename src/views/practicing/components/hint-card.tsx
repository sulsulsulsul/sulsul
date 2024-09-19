import { HTMLAttributes } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { useUpdateHint } from '@/entities/practice/practicing/hooks';
import { ArchiveKeyword } from '@/entities/types';
import { cn } from '@/lib/utils';

interface HintCardProps extends HTMLAttributes<HTMLDivElement> {
  showHint: boolean;
  questionId: number;
  setShowHint: (showHint: boolean) => void;
  hintShown: boolean;
  answerHint: string;
  keywords: ArchiveKeyword[];
}

export const HintCard = ({
  className,
  showHint,
  questionId,
  hintShown,
  answerHint,
  keywords,
  setShowHint,
  ...props
}: HintCardProps) => {
  const { mutate } = useUpdateHint();
  const handleUseHint = () => {
    setShowHint(!showHint);
    !hintShown && mutate(questionId);
  };
  return (
    <div
      className={cn(
        'relative flex size-full flex-col px-[42px] pt-[60px] pb-[50px]',
        className,
      )}
      {...props}
    >
      <div className="flex h-[53px] w-full items-center gap-1 overflow-scroll">
        {keywords &&
          keywords.length !== 0 &&
          keywords.map((value: ArchiveKeyword) => (
            <Badge
              key={value.keywordId}
              variant={'keyword'}
              className="min-w-fit"
            >
              {value.content}
            </Badge>
          ))}
      </div>
      <div className="mt-3 grow overflow-scroll text-lg font-medium mobile:text-sm">
        {answerHint}
      </div>
      <div
        onClick={handleUseHint}
        className="absolute bottom-[13.5px] left-1/2 flex w-full -translate-x-1/2 cursor-pointer items-center justify-center gap-1"
      >
        <span className="text-gray-500 mobile:text-sm">힌트</span>
        <ChevronUp
          className={cn('text-gray-400 transition-transform mobile:size-4', {
            'transform -rotate-180': showHint,
          })}
        />
      </div>
    </div>
  );
};
