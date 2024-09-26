import { useEffect, useState } from 'react';
import Image from 'next/image';

import { InterviewData } from '@/entities/types/interview';
import { applyNewLines, cn, removeNewlines } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useTemporarySaveStore } from '@/store/temporarySaveStore';

interface ModalHeaderProp {
  charCount: number;
  content: string;
  currentData: InterviewData;
  isDisabled: boolean;
}

export const ModalHeader = ({
  charCount,
  content,
  currentData,
  isDisabled,
}: ModalHeaderProp) => {
  const { isTemporarySaved, setIsTemporarySaved } = useTemporarySaveStore();
  const { isOpenCancelModal, setOpenCancelModal } = useAnswerModalStore();
  const [isClicked, setClicked] = useState(false);

  const handleClickTemporarySave = () => {
    if (content !== localStorage.getItem('temporarySave')) {
      localStorage.setItem('temporarySave', content);
      setIsTemporarySaved(true);
      setClicked(true);

      setTimeout(() => {
        setIsTemporarySaved(false);
      }, 3000);
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
          className={cn('flex items-center gap-1 font-medium text-[15px]')}
          onClick={handleClickTemporarySave}
          disabled={
            isDisabled || content === localStorage.getItem('temporarySave')
          }
        >
          {isTemporarySaved || isClicked ? (
            <div className="flex items-center gap-1 text-blue-500">
              <Image
                src="/images/icons/icon-check.svg"
                className=""
                alt="임시저장"
                width={14}
                height={14}
              />
              <p className="">임시저장됨</p>
            </div>
          ) : (
            <p>임시저장</p>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-gray-900 mobile:hidden">
          Q. {removeNewlines(currentData?.content)}
        </div>
        <div className="text-3xl font-bold text-gray-900 tablet:hidden desktop:hidden">
          {applyNewLines(currentData?.content).map((line) => (
            <div className="max-w-[260px] text-4xl font-bold" key={line}>
              {line}
              <br />
            </div>
          ))}
        </div>
        <button
          className={cn(
            'flex items-center gap-1 font-medium text-[15px] text-blue-500 disabled:text-gray-300  mobile:hidden',
          )}
          onClick={handleClickTemporarySave}
          disabled={isDisabled}
        >
          {isTemporarySaved || isClicked ? (
            <div className="flex items-center gap-1">
              <Image
                src="/images/icons/icon-check.svg"
                className=""
                alt="임시저장"
                width={14}
                height={14}
              />
              <p className="text-blue-500">임시저장됨</p>
            </div>
          ) : (
            <p>임시저장</p>
          )}
        </button>
      </div>
    </div>
  );
};
