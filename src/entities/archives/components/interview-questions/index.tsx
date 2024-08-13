'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { FormStatus } from '@/app/(routes)/archive/create/components/form-status';
import { ArchiveFormProvider } from '@/app/(routes)/archive/create/hooks/use-create-archive-form';
import { ArchiveDetailDTO } from '@/entities/types';
import { cn } from '@/lib/utils';
import { useSaveUpdatedQuestionStore } from '@/store/savingUpdatedQuestion';

import { AddQuestion } from '../question-card/add-question';
import { LoadedStatus } from './status/loaded';
import { SavingStatus } from './status/saving';

interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveDetailDTO;
}

export const InterviewQuestions = ({
  className,
  data,
  ...props
}: InterviewQuestionsProps) => {
  const { isSaving } = useSaveUpdatedQuestionStore();
  const { status, archiveId } = data;

  return (
    <>
      <div className={cn(className)} {...props}>
        {status === 'READY' && (
          <ArchiveFormProvider>
            <FormStatus className="h-[70vh] w-[690px]" />
          </ArchiveFormProvider>
        )}
        {status === 'COMPLETE' && (
          <>
            <h2 className="flex items-center gap-1 text-4xl font-bold">
              <Image
                src="/images/icons/etc-speech.svg"
                width={32}
                height={32}
                alt="icon"
              />
              <span>면접 예상질문</span>
              <span className="text-blue-500">{data.questions.length}</span>
              {isSaving && <SavingStatus />}
            </h2>
            <div className="mt-[18px] h-[80vh] w-full overflow-y-scroll">
              <LoadedStatus data={data.questions} archiveId={archiveId} />
            </div>
          </>
        )}
      </div>
      <AddQuestion archiveId={archiveId} />
    </>
  );
};
