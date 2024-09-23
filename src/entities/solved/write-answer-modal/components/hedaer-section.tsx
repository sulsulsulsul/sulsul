import { useEffect, useState } from 'react';
import Image from 'next/image';

import { InterviewData } from '@/entities/types/interview';
import { cn } from '@/lib/utils';

interface ModalHeaderProp {
  charCount: number;
  content: string;
  currentData: InterviewData;
}

export const ModalHeader = ({
  charCount,
  content,
  currentData,
}: ModalHeaderProp) => {
  const [isClicked, setClicked] = useState(false);
  const className = charCount ? 'text-blue-500' : 'text-gray-300';

  const removeNewlines = (str: string) => {
    return str.replace(/\\n/g, ' ');
  };

  const handleClickTemporarySave = () => {
    if (charCount > 0) {
      localStorage.setItem('temporarySave', content);
      setClicked(true);
    }
  };

  useEffect(() => {
    setClicked(false);
  }, [charCount]);

  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-gray-900">
        Q. {removeNewlines(currentData?.content)}
      </div>
      <button
        className={cn(
          'flex items-center gap-1 font-medium text-[15px]',
          className,
        )}
        onClick={handleClickTemporarySave}
      >
        {isClicked && (
          <Image
            src="/images/icons/icon-check.svg"
            alt="임시저장"
            width={14}
            height={14}
          />
        )}
        <p>임시저장</p>
      </button>
    </div>
  );
};
