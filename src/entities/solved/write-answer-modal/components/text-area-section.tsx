import { FormProvider } from 'react-hook-form';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { useWriteAnswerForm } from '../../hooks/use-write-answer-form';
import { TextAreaDescription } from './text-area-description';

interface TextAreaSectionProps {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
}

export const TextAreaSection = ({
  handleInput,
  charCount,
}: TextAreaSectionProps) => {
  const { form } = useWriteAnswerForm();

  return (
    <div className="relative h-[254px] rounded-xl border border-solid border-gray-200 px-4 pb-6 pt-4">
      <FormProvider {...form}>
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
      </FormProvider>
    </div>
  );
};
