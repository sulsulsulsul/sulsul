import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { AnswerListData, InterviewData } from '@/entities/types/interview';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';
import { useTemporarySaveStore } from '@/store/temporarySaveStore';

import { useCreateAnswer } from '../../hooks/use-create-answer';
import { useInterval } from '../../hooks/use-interval';
import { useUpdateAnswer } from '../../hooks/use-update-answer';
import { useWriteAnswerForm } from '../../hooks/use-write-answer-form';
import { ButtonSection } from './button-section';
import { TextAreaDescription } from './text-area-description';

interface TextAreaSectionProps {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  currentData: InterviewData;
  isEditModal?: boolean;
  myAnswerData: AnswerListData | null;
  isOpenAnswerModal: boolean;
}

export const TextAreaSection = ({
  handleInput,
  currentData,
  isEditModal,
  myAnswerData,
  isOpenAnswerModal,
}: TextAreaSectionProps) => {
  const { auth } = useUserStore();
  const { form } = useWriteAnswerForm();
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  const userId = auth.userId;
  const accessToken = auth.accessToken;

  const inputValue = form.watch('answer');

  const { setOpenAnswerModal } = useAnswerModalStore();
  const { setIsTemporarySaved } = useTemporarySaveStore();
  const currentInterviewId = currentData.weeklyInterviewId || 1;

  const { mutate: createAnswerMutation, isSuccess: isSuccessCreate } =
    useCreateAnswer({
      currentInterviewId,
      userId,
      pivotDate,
    });

  const { mutate: editAnswerMutation, isSuccess: isSuccessUpdate } =
    useUpdateAnswer({
      currentInterviewId,
      answerId: myAnswerData?.weeklyInterviewAnswerId || 0,
      content: inputValue,
      pivotDate,
      userId,
    });

  const onSubmit = (data: { answer: string }) => {
    if (isEditModal) {
      editAnswerMutation();
    } else {
      createAnswerMutation({
        interviewId: currentInterviewId,
        accessToken: accessToken,
        content: data.answer,
      });
    }
  };

  const saveTemporaryAnswer = () => {
    sessionStorage.setItem('temporarySave', inputValue);
    setIsTemporarySaved(true);

    setTimeout(() => {
      setIsTemporarySaved(false);
    }, 3000);
  };

  useInterval(() => {
    if (isEditModal) return;
    if (sessionStorage.getItem('temporarySave') !== inputValue) {
      saveTemporaryAnswer();
    }
  }, 30000);

  const onFormSubmit = form.handleSubmit((data) => {
    onSubmit({ answer: data.answer || '' });
  });

  useEffect(() => {
    if (isEditModal && !sessionStorage.getItem('temporarySave')) {
      form.reset({
        answer: myAnswerData?.content || '',
      });
    }

    if (isEditModal && sessionStorage.getItem('temporarySave')) {
      form.reset({
        answer: sessionStorage.getItem('temporarySave') || '',
      });
    }
    if (!isEditModal && sessionStorage.getItem('temporarySave')) {
      form.reset({
        answer: sessionStorage.getItem('temporarySave') || '',
      });
    }
  }, [isEditModal, myAnswerData, form.reset]);

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      setOpenAnswerModal(false);
    }
  }, [isSuccessCreate, isSuccessUpdate, setOpenAnswerModal]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
        <div className="relative h-[254px] rounded-xl border border-solid border-gray-200 px-4 pb-6 pt-4 mobile:h-[206px]">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="z-10 w-full space-y-0">
                <Textarea
                  maxLength={499}
                  className="z-10 h-[180px] w-full resize-none rounded-none border-none p-0 text-base mobile:h-[120px]"
                  placeholder={''}
                  onInput={handleInput}
                  {...field}
                />
                <TextAreaDescription show={inputValue.length === 0} />
                <div className="absolute bottom-4 z-10 flex w-full items-center justify-between pr-8">
                  <div className="text-[12px] text-gray-500">
                    {inputValue.length}/500자
                  </div>
                  <FormMessage type="error" className="text-[12px]" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <ButtonSection
          charCount={inputValue.length}
          disalbled={isEditModal ? inputValue === myAnswerData?.content : false}
        />
      </form>
    </FormProvider>
  );
};
