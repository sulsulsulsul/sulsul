import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';

import { cn } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';

import { CancelConfirmModal } from '../cancel-confirm-modal';
import { ButtonSection } from './components/button-section';
import { ModalHeader } from './components/hedaer-section';
import { TextAreaSection } from './components/text-area-section';

export const WriteAnswerModal = () => {
  const { isOpenCancelModal } = useAnswerModalStore();

  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    setContent(e.target.value);
  };

  const zIndexClassName = isOpenCancelModal ? 'z-[63]' : 'z-[60]';
  return (
    <>
      <div
        className={cn(
          'fixed flex w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
          zIndexClassName,
        )}
      ></div>
      <div className="fixed left-0 top-0 z-[62] flex h-screen w-screen items-center justify-center">
        <div className="absolute flex min-h-[426px] w-[624px] flex-col gap-4 rounded-md bg-white p-[30px]">
          <div className="flex flex-col gap-6">
            <ModalHeader charCount={charCount} content={content} />
            <TextAreaSection handleInput={handleInput} charCount={charCount} />
          </div>
          <ButtonSection charCount={charCount} />
        </div>
      </div>
      {isOpenCancelModal && <CancelConfirmModal />}
    </>
  );
};
