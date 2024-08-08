'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { InterviewQuestions } from '@/entities/archives/components/interview-questions';
import { PendingStatus } from '@/entities/archives/components/interview-questions/status/pending';
import { useArchive } from '@/entities/archives/hooks';
import { cn } from '@/lib/utils';
import { usePendingStore } from '@/store/client';
import { useCreateQuestionStore } from '@/store/createQuestions';
import { useCurrentArchiveIdStore } from '@/store/currentArchiveId';
import { useSampleStore } from '@/store/sampleQuestions';

import { useCreateArchiveFormContext } from '../../hooks/use-create-archive-form';
import { CompleteStatus } from './status/complete';
import { IdleStatus } from './status/idle';
import { ValidStatus } from './status/valid';
interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {}

export const FormStatus = ({
  className,
  ...props
}: InterviewQuestionsProps) => {
  const { isPending } = usePendingStore();
  const { form } = useCreateArchiveFormContext();
  const { isSampleClicked, isSampleWritten } = useSampleStore();
  const { isQuestionCreated } = useCreateQuestionStore();
  const { currentId } = useCurrentArchiveIdStore();
  const { archive } = useArchive(currentId);

  const isSubmitting = form.formState.isSubmitting;
  const isFormValid = form.formState.isValid;

  return (
    <div className={cn(className)} {...props}>
      {isQuestionCreated ? (
        <InterviewQuestions data={archive!} className="h-full w-[690px]" />
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
          </h2>
          {isSampleWritten ? (
            <CompleteStatus />
          ) : (
            <div className="mt-[18px] size-full rounded-md shadow-base">
              {isSubmitting || isPending ? (
                <PendingStatus className="bg-gray-50" />
              ) : isSampleClicked ||
                (isFormValid && !isSubmitting && !isPending) ? (
                <ValidStatus />
              ) : (
                <IdleStatus
                  className="rounded-md bg-white shadow-base"
                  firstLine="내 자소서에선 어떤 질문이 나올까요?"
                  secondLine="왼쪽에서 내용을 입력해보세요!"
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
