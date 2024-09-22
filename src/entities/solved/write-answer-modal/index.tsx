import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';

import { cn } from '@/lib/utils';

import { ButtonSection } from './components/button-section';
import { ModalHeader } from './components/hedaer-section';
import { TextAreaSection } from './components/text-area-section';

interface WriteSolvedModalProp extends HTMLAttributes<HTMLDivElement> {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const WriteSolvedModal = ({
  setModal,
  className,
}: WriteSolvedModalProp) => {
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    setContent(e.target.value);
  };
  return (
    <div
      className={cn(
        'fixed flex  w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
      )}
    >
      <div className="flex min-h-[426px] w-[624px] flex-col gap-4 rounded-md border border-gray-100 bg-white p-[30px]">
        <div className="flex flex-col gap-6">
          <ModalHeader charCount={charCount} content={content} />
          <TextAreaSection handleInput={handleInput} charCount={charCount} />
        </div>
        <ButtonSection charCount={charCount} setModal={setModal} />
      </div>
    </div>
  );
};
