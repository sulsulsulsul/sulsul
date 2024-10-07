'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';

import { InterviewQuestions } from '@/entities/archives/components/interview-questions';
import { PendingStatus } from '@/entities/archives/components/interview-questions/status/pending';
import { PendingProgress } from '@/entities/archives/components/interview-questions/status/pending-progress';
import { AddQuestion } from '@/entities/archives/components/question-card/add-question';
import { useArchive } from '@/entities/archives/hooks';
import { cn } from '@/lib/utils';
import { useArchiveStatusStore } from '@/store/archiveStatus';
import { usePendingStore } from '@/store/client';
import { useCreateQuestionStore } from '@/store/createQuestions';
import { useCurrentArchiveIdStore } from '@/store/currentArchiveId';
import { useSampleStore } from '@/store/sampleQuestions';

import { useCreateArchiveFormContext } from '../../hooks/use-create-archive-form';
import { CompleteStatus } from './status/complete';
import { IdleStatus } from './status/idle';
import { ValidStatus } from './status/valid';
interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  version?: string;
}

export const FormStatus = ({
  className,
  version,
  ...props
}: InterviewQuestionsProps) => {
  const { isPending, setIsPending } = usePendingStore();
  const { form } = useCreateArchiveFormContext();
  const { isSampleClicked, isSampleWritten } = useSampleStore();
  const { isQuestionCreated, setIsQuestionCreated } = useCreateQuestionStore();
  const { currentId } = useCurrentArchiveIdStore();
  const { archive } = useArchive(currentId);
  const { status } = useArchiveStatusStore();

  const [showProgress, setShowProgress] = useState(false);

  const isSubmitting = form.formState.isSubmitting;
  const isFormValid = form.formState.isValid;

  useEffect(() => {
    if (isPending && status === 'PENDING') {
      setShowProgress(true);
    } else if (status === 'COMPLETE' || status === 'FAIL') {
      const timer = setTimeout(() => {
        setShowProgress(false);
        setIsPending(false);
        if (status === 'COMPLETE') {
          setIsQuestionCreated(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending, status, setIsPending, setIsQuestionCreated]);

  return (
    <div className={cn(className)} {...props}>
      {isQuestionCreated ? (
        <>
          <InterviewQuestions
            data={archive!}
            className="mb-4 h-full w-[690px]"
          />
          {isQuestionCreated && <AddQuestion archiveId={currentId} />}
        </>
      ) : (
        <>
          <h2 className="flex items-center gap-1 text-4xl font-bold">
            <Image
              src="/images/icons/etc-speech.svg"
              width={32}
              height={32}
              alt="icon"
            />
            <span>면접 예상질문</span>
            <span className="text-blue-500">{isSampleWritten && 6}</span>
          </h2>
          {isSampleWritten ? (
            <CompleteStatus />
          ) : (
            <div className="mt-[18px] size-full rounded-md">
              {showProgress ? (
                version === '2' ? (
                  <PendingStatus />
                ) : (
                  <PendingProgress isPending={isPending} status={status} />
                )
              ) : isSampleClicked ||
                (isFormValid && !isSubmitting && !isPending) ? (
                <ValidStatus className="border border-gray-200 shadow-base" />
              ) : (
                <IdleStatus
                  className="h-[650px] rounded-md border border-gray-200 bg-white shadow-base"
                  firstLine="내 자소서에선 어떤 질문이 나올까요?"
                  secondLine="왼쪽에서 내용을 입력해보세요!"
                  isCreate
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
