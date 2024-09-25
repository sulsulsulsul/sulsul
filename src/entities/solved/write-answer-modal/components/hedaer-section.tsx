import { useEffect, useState } from 'react';
import Image from 'next/image';

import { InterviewData } from '@/entities/types/interview';
import { cn, removeNewlines } from '@/lib/utils';

interface ModalHeaderProp {
  charCount: number;
  content: string;
  currentData: InterviewData;
  disabled: boolean;
}

export const ModalHeader = ({
  charCount,
  content,
  currentData,
  disabled,
}: ModalHeaderProp) => {
  const [isClicked, setClicked] = useState(false);
  const className = charCount || !disabled ? 'text-blue-500' : 'text-gray-300';

  const handleClickTemporarySave = () => {
    if (charCount > 0) {
      localStorage.setItem('temporarySave', content);
      setClicked(true);
    }
  };

  useEffect(() => {
    setClicked(false);
  }, [charCount]);
  console.log(disabled);
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-gray-900">
        Q. {removeNewlines(currentData?.content)}
      </div>
      <button
        className={cn(
          'flex items-center gap-1 font-medium text-[15px] disabled:cursor-not-allowed',
          className,
        )}
        onClick={handleClickTemporarySave}
        disabled={disabled}
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
