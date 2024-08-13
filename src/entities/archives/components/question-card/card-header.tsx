import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { useUpdateQuestion } from '@/entities/questions/hooks/use-update-question';
import { ArchiveKeyword } from '@/entities/types';
import { cn } from '@/lib/utils';
import { useSaveUpdatedQuestionStore } from '@/store/savingUpdatedQuestion';

import { KeywordSet } from '../keyword-section/keyword';
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  keywords: ArchiveKeyword[];
  isAnswered: boolean;
  questionId: number;
  isAccodionOpen: boolean;
}

export const CardHeader = ({
  className,
  content,
  keywords,
  isAnswered,
  questionId,
  isAccodionOpen,
  ...props
}: CardHeaderProps) => {
  const [inputValue, setInputValue] = useState(content);
  const answeredIconClass = isAnswered ? 'bg-blue-500' : 'bg-gray-200';
  const { mutate: updateQuestionMutation, isPending } = useUpdateQuestion();
  const { isSaving, setIsSaving } = useSaveUpdatedQuestionStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //3초마다 변경된 질문 저장
  useEffect(() => {
    if (inputValue !== content) {
      const delayDebounceFn = setTimeout(() => {
        updateQuestionMutation({ questionId, content: inputValue });
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [inputValue, content, questionId, updateQuestionMutation]);

  useEffect(() => {
    if (isPending) {
      setIsSaving(true);
    }
    if (isSaving) {
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isPending, setIsSaving, isSaving]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={cn(className)} {...props}>
      <div className="flex w-full items-center justify-start gap-2 border-none p-0 py-2">
        <div
          className={`size-[9.6px] min-w-[9.6px] rounded-full ${answeredIconClass}`}
        />
        <textarea
          ref={textareaRef}
          value={inputValue}
          placeholder="예상질문을 작성해주세요"
          className="w-[500px] resize-none overflow-hidden focus:outline-none"
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange}
          rows={1}
        />
      </div>
      {!isAccodionOpen && (
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <KeywordSet keywords={keywords} isHeader />
        </div>
      )}
    </div>
  );
};
