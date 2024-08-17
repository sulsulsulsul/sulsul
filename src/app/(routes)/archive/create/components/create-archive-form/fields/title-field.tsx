import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useCurrentUser } from '@/entities/users/hooks';
import { cn } from '@/lib/utils';
import { useSampleStore } from '@/store/sampleQuestions';

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form';
interface TitleFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const TitleField = ({ className, ...props }: TitleFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const { form } = useCreateArchiveFormContext();
  const { isSampleClicked } = useSampleStore();
  const { status } = useCurrentUser();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className={cn(className)} {...props}>
      {isSampleClicked ? (
        <div className="text-2xl font-semibold text-gray-800">
          팀으로 함께 성과를 만들어낸 경험을 작성해주세요.
        </div>
      ) : (
        <FormField
          control={form.control}
          name="title"
          disabled={status === 'unauthenticated'}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <textarea
                  placeholder="자소서 제목을 입력해주세요"
                  className="w-full resize-none px-0 text-xl font-semibold"
                  {...field}
                  rows={1}
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
