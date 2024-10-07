'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { FormStatus } from '@/app/(routes)/archive/create/components/form-status';
import { ArchiveFormProvider } from '@/app/(routes)/archive/create/hooks/use-create-archive-form';
import { useDeleteQuestion } from '@/entities/questions/hooks/use-delete-question';
import { ArchiveDetailDTO } from '@/entities/types';
import { cn } from '@/lib/utils';
import { useDeleteQuestionStore } from '@/store/deleteQuestions';
import { useEditQuestionStore } from '@/store/editingQuestions';
import { useSaveUpdatedQuestionStore } from '@/store/savingUpdatedQuestion';

import { AddQuestion } from '../question-card/add-question';
import { LoadedStatus } from './status/loaded';
import { SavingStatus } from './status/saving';

interface InterviewQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveDetailDTO;
  type?: string;
}

export const InterviewQuestions = ({
  className,
  data,
  type = '',
  ...props
}: InterviewQuestionsProps) => {
  const { status, archiveId } = data;

  const { isSaving } = useSaveUpdatedQuestionStore();
  const { isEditing, setIsEditing } = useEditQuestionStore();
  const { deleteQuestions, setDeleteQuestions } = useDeleteQuestionStore();

  const { mutateAsync: deleteQuestionMutation } = useDeleteQuestion(archiveId);

  const [clickedQuestions, setClickedQuestions] = useState<number[]>([]);
  const pathName = usePathname();

  const handleReset = () => {
    setIsEditing(false);
    setDeleteQuestions([]);
    setClickedQuestions([]);
  };

  useEffect(() => {
    return handleReset;
  }, []);

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
            <h2 className="relative flex items-center gap-1 text-4xl font-bold">
              <Image
                src="/images/icons/etc-speech.svg"
                width={32}
                height={32}
                alt="icon"
              />
              <span>면접 예상질문</span>
              <span className="text-blue-500">{data.questions.length}</span>
              {isSaving && <SavingStatus />}
              {!isEditing && (
                <span
                  className="absolute right-3 cursor-pointer text-sm font-normal text-gray-500"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </span>
              )}
              {isEditing && (
                <>
                  <span
                    className="absolute right-12 cursor-pointer text-sm font-normal text-red-500"
                    onClick={async () => {
                      try {
                        await Promise.all(
                          deleteQuestions.map((questionId) =>
                            deleteQuestionMutation({ questionId }),
                          ),
                        );
                        toast.success('예상질문을 삭제했어요.');
                        handleReset();
                      } catch (error) {
                        toast.error(
                          '삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
                        );
                      }
                    }}
                  >
                    삭제
                  </span>
                  <span
                    className="absolute right-3 cursor-pointer text-sm font-normal text-gray-700"
                    onClick={handleReset}
                  >
                    취소
                  </span>
                </>
              )}
            </h2>
            <div className="mt-[8px] w-full overflow-visible">
              <LoadedStatus
                data={data.questions}
                archiveId={archiveId}
                clickedQuestions={clickedQuestions}
                setClickedQuestions={setClickedQuestions}
                type={type}
              />
            </div>
          </>
        )}
      </div>
      <AddQuestion archiveId={archiveId} />
    </>
  );
};
