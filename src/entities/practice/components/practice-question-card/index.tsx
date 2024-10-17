import { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOpenModalStore, useSelectedQuestionStore } from '@/store/modal';
interface PracticedQuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  title: string;
  company: string;
  resumeId: number;
  questionId: number;
}

export const PracticedQuestionCard = ({
  className,
  content,
  title,
  company,
  resumeId,
  questionId,
}: PracticedQuestionCardProps) => {
  const { setModalOpen } = useOpenModalStore();
  const { setPreSelectQuestionId, setResumeId } = useSelectedQuestionStore();

  const onClickRetry = (resumeId: number, questionId: number) => {
    setResumeId(resumeId);
    setPreSelectQuestionId(questionId);
  };
  const handleRetry = () => {
    onClickRetry(resumeId, questionId);
    setModalOpen(true);
  };
  return (
    <div
      className={cn(
        'desktop:w-[574px] w-full flex items-center justify-between rounded-md border border-gray-200 bg-white p-6 shadow-base gap-[16px]',
        className,
      )}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        <h4 className="truncate text-lg font-semibold">{content}</h4>
        <div className="flex items-center gap-[6px] text-gray-500">
          <span className="w-fit shrink-0  rounded-sm bg-gray-100 px-[7px] py-[10px] text-2xs font-medium">
            {company}
          </span>
          <p className="truncate text-sm font-medium">{title}</p>
        </div>
      </div>
      <Button size="sm" variant="green" onClick={handleRetry}>
        다시 연습
      </Button>
    </div>
  );
};
