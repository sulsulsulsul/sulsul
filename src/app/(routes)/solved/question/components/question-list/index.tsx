'use client';
import { HTMLAttributes } from 'react';

import { CompleteStatus } from '@/app/(routes)/archive/create/components/form-status/status/complete';
import { InterviewQuestions } from '@/entities/archives/components/interview-questions';
import { AddQuestion } from '@/entities/archives/components/question-card/add-question';
import { useArchive } from '@/entities/archives/hooks';
import { cn } from '@/lib/utils';
import { useCreateQuestionStore } from '@/store/createQuestions';
import { useCurrentArchiveIdStore } from '@/store/currentArchiveId';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const QuestionList = ({ className }: QuestionListProps) => {
  const { isQuestionCreated } = useCreateQuestionStore();
  const { currentId } = useCurrentArchiveIdStore();
  const { archive } = useArchive(currentId);
  return (
    <>
      <div className={cn('h-full', className)}>
        {isQuestionCreated ? (
          <>
            <InterviewQuestions data={archive!} className="h-full w-[690px]" />
            {isQuestionCreated && <AddQuestion archiveId={currentId} />}
          </>
        ) : (
          <CompleteStatus />
        )}
      </div>
    </>
  );
};

export default QuestionList;
