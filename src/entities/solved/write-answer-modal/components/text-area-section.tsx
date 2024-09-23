import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useInterviewStore } from '@/store/interviewStore';

import { useCreateAnswer } from '../../hooks/use-create-answer';
import { useWriteAnswerForm } from '../../hooks/use-write-answer-form';
import { ButtonSection } from './button-section';
import { TextAreaDescription } from './text-area-description';

interface TextAreaSectionProps {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
  content: string;
  accessToken: string;
}

export const TextAreaSection = ({
  handleInput,
  charCount,
  content,
  accessToken,
}: TextAreaSectionProps) => {
  const { form } = useWriteAnswerForm();
  const {
    mutate: createAnswerMutation,
    isPending,
    isSuccess,
  } = useCreateAnswer();
  const { setOpenAnswerModal } = useAnswerModalStore();
  const { currentData } = useInterviewStore();
  const currentInterviewId = currentData.weeklyInterviewId || 1;
  // const authInfo = await auth();
  // const accessToken = authInfo?.user.auth.accessToken || '';
  // const handleSubmit = form.handleSubmit((data) => {
  //   if (isPending) return;
  //   mutate(data);
  // });
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      answer: content,
    },
  });
  useEffect(() => {
    setValue('answer', content);
  }, [content, setValue]);

  useEffect(() => {
    if (isSuccess) {
      setOpenAnswerModal();
    }
  }, [isSuccess, setOpenAnswerModal]);

  const onSubmit = (data: { answer: string }) => {
    console.log(currentInterviewId, accessToken, data.answer);
    createAnswerMutation({
      interviewId: currentInterviewId,
      accessToken: accessToken,
      content: data.answer,
    });
  };

  const inputAnswer = watch('answer');
  console.log(inputAnswer);
  console.log(form);

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({ answer: data.answer });
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
        <div className="relative h-[254px] rounded-xl border border-solid border-gray-200 px-4 pb-6 pt-4">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="z-10 w-full space-y-0">
                <Textarea
                  maxLength={499}
                  className="z-10 h-[180px] w-full resize-none rounded-none border-none p-0  text-base"
                  placeholder={''}
                  onInput={handleInput}
                  {...field}
                />
                <TextAreaDescription show={charCount === 0} />

                <div className="absolute bottom-4 z-10 flex w-full items-center justify-between pr-8">
                  <div className="text-[12px] text-gray-500">
                    {charCount}/500자
                  </div>
                  <FormMessage type="error" className="text-[12px]" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <ButtonSection charCount={charCount} />
      </form>
    </FormProvider>
  );
};
