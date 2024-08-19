'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { DialogListProp, MessageProp } from '../../types/onboard';

export const ListDialog = ({
  dialogContents,
  hidden,
  id,
  iconMessage,
  firstDialog,
}: DialogListProp) => {
  return (
    <div className={cn('flex flex-row', !firstDialog && 'pl-[14px]')}>
      {firstDialog && (
        <Image
          alt=""
          src={'/images/speech-bubble.svg'}
          width={14}
          height={16}
        />
      )}
      <div
        className={cn(
          'flex w-fit flex-col rounded-md bg-gray-100 px-[22px] py-[17.5px] text-black',
          hidden ? 'invisible' : 'visible',
        )}
      >
        {dialogContents.map((dialogContent: MessageProp[], index: number) => {
          const listNumber = index >= 1 ? index : index + 1;
          const visibility = index == 1 ? 'invisible' : 'visible';
          return (
            <div
              key={index}
              className={cn(
                'flex flex-row items-center h-[26px]',
                listNumber >= 2 && 'mt-[4px]',
              )}
            >
              {id === 'list' && !hidden && (
                <div
                  className={`my-[4px] mr-[4px] flex size-[18px] place-content-center items-center rounded-full bg-blue-500 text-center text-[12px] text-white ${visibility}`}
                >
                  {listNumber}
                </div>
              )}
              {id === 'explaination' && (
                <Image
                  src={iconMessage as string}
                  alt="logo"
                  width={80}
                  height={19}
                />
              )}
              {dialogContent.map(
                (content: MessageProp, contentIndex: number) => {
                  return (
                    <div
                      key={contentIndex}
                      className={cn(
                        'whitespace-pre  text-lg  h-[26px]',
                        content.className,
                      )}
                    >
                      {content.message}
                    </div>
                  );
                },
              )}
              {id === 'greeting' && (
                <Image
                  src={iconMessage as string}
                  alt="wave-hand"
                  width={26}
                  height={26}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
