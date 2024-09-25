import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useInterviewStore } from '@/store/interviewStore';

import { CancelConfirmModal } from '../cancel-confirm-modal';
import { ModalHeader } from './components/hedaer-section';
import { TextAreaSection } from './components/text-area-section';

export const WriteAnswerModal = () => {
  const { isOpenAnswerModal } = useAnswerModalStore();

  const { isOpenCancelModal } = useAnswerModalStore();
  const { currentData } = useInterviewStore();
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    setContent(e.target.value);
  };

  useEffect(() => {
    if (isOpenCancelModal || isOpenAnswerModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenCancelModal, isOpenAnswerModal]);

  const modalZIndex = isOpenCancelModal ? 'z-[70]' : 'z-[60]';

  return (
    <>
      <div
        className={cn(
          'fixed flex w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
          modalZIndex,
        )}
      ></div>

      <div className="fixed left-0 top-0 z-[60] flex h-screen w-screen items-center justify-center">
        <div className="absolute flex min-h-[426px] w-[624px] flex-col gap-4 rounded-md bg-white p-[30px]">
          <div className="flex flex-col gap-6">
            <ModalHeader
              charCount={charCount}
              content={content}
              currentData={currentData}
            />
            <TextAreaSection
              handleInput={handleInput}
              charCount={charCount}
              content={content}
              currentData={currentData}
            />
          </div>
        </div>
      </div>

      {isOpenCancelModal && (
        <div className="fixed left-0 top-0 z-[70] flex h-screen w-screen items-center justify-center">
          <CancelConfirmModal />
        </div>
      )}
    </>
  );
};
