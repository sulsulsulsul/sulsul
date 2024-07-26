'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'

import { DialogListProp, MessageProp } from '../../types/onboard'

export const ListDialog = ({
  dialogListContent,
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
          'flex w-fit flex-col rounded-md bg-[#F0F0F5] px-[22px] py-[17.5px] text-black',
          hidden ? 'invisible' : 'visible',
        )}
      >
        {dialogListContent.map((value: MessageProp[], index: number) => {
          const listNumber = index >= 1 ? index : index + 1
          const visibility = index == 1 ? 'invisible' : 'visible'
          return (
            <div key={index} className="flex flex-row items-center">
              {id == 'list' && !hidden && (
                <div
                  className={`mr-[4px] size-[18px] rounded-full bg-[#576DFC] text-center leading-[18px] text-white ${visibility}`}
                >
                  {listNumber}
                </div>
              )}
              {id == 'explaination' && (
                <Image
                  src={iconMessage as string}
                  alt="logo"
                  width={80}
                  height={19}
                ></Image>
              )}
              {value.map((content: MessageProp, contentIndex) => {
                return (
                  <div
                    key={contentIndex}
                    className={cn('whitespace-pre', content.className)}
                  >
                    {content.message}
                  </div>
                )
              })}
              {id == 'greeting' && (
                <Image
                  src={iconMessage as string}
                  alt="wave-hand"
                  width={24}
                  height={24}
                ></Image>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
