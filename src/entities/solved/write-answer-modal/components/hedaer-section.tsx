import { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ModalHeaderProp {
  charCount: number;
  content: string;
}

export const ModalHeader = ({ charCount, content }: ModalHeaderProp) => {
  const [isClicked, setClicked] = useState(false);
  const className = charCount ? 'text-blue-500' : 'text-gray-300';

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
        Q. 상사와 의견이 다를 때 어떻게 대처하실 건가요?
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
