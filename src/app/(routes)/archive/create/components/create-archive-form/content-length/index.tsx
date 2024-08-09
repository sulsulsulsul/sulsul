import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { useSampleStore } from '@/store/sampleQuestions';

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form';
interface ContentLengthProps extends HTMLAttributes<HTMLDivElement> {}

export const ContentLength = ({ className, ...props }: ContentLengthProps) => {
  const SAMPLE_CONTENT_LENGTH = 523;

  const { form } = useCreateArchiveFormContext();
  const { isSampleClicked } = useSampleStore();

  const contentLength = form.watch('resume')?.length || 0;

  return (
    <div className={cn(className)} {...props}>
      <div className="text-2xl font-semibold">
        <span className="text-gray-600">
          {isSampleClicked ? SAMPLE_CONTENT_LENGTH : contentLength}
        </span>
        <span className="text-gray-400">/2000자</span>
      </div>
    </div>
  );
};
