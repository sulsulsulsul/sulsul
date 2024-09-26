import { useEffect, useState } from 'react';
import Image from 'next/image';

import { InterviewData } from '@/entities/types/interview';
import { applyNewLines, cn, removeNewlines } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';

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
  const { isOpenCancelModal, setOpenCancelModal } = useAnswerModalStore();
  const [isClicked, setClicked] = useState(false);
  const className = charCount || !disabled ? 'text-blue-500' : 'text-gray-300';

  const handleClickTemporarySave = () => {
    if (charCount > 0) {
      localStorage.setItem('temporarySave', content);
      setClicked(true);
    }
  };

  const handleClickCancelBtn = () => {
    setOpenCancelModal(true);
  };
  useEffect(() => {
    setClicked(false);
  }, [charCount]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between tablet:hidden desktop:hidden ">
        <Image
          src="/images/icons/icon-close-m.svg"
          className="cursor-pointer"
          width={24}
          height={24}
          alt="닫기 버튼"
          onClick={handleClickCancelBtn}
        />
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
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-gray-900 mobile:hidden">
          Q. {removeNewlines(currentData?.content)}
        </div>
        <div className="text-3xl font-bold text-gray-900 tablet:hidden desktop:hidden">
          {' '}
          {applyNewLines(currentData?.content).map((line) => (
            <div className="max-w-[260px] text-4xl font-bold" key={line}>
              {line}
              <br />
            </div>
          ))}
        </div>
        <button
          className={cn(
            'flex items-center gap-1 font-medium text-[15px] disabled:cursor-not-allowed mobile:hidden',
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
    </div>
  );
};
