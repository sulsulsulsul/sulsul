import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const Solved = () => {
  return (
    <main className="px-5">
      <section className="flex max-w-[588px] flex-col gap-2">
        <div className="relative flex">
          <div className="flex flex-1 gap-1">
            <Image
              src="/images/icons/etc-speech.svg"
              width={32}
              height={32}
              alt="icon"
            />
            <h2 className="text-[20px] font-bold">다같이 면접기출</h2>
          </div>
          <Image
            src="/images/icons/icon-information circle.svg"
            className="absolute bottom-0 right-4"
            width={20}
            height={20}
            alt="icon"
          />
        </div>
        <div className="flex h-[520px] w-full flex-col items-center justify-center gap-5 rounded-md border border-gray-200 bg-white shadow-base">
          <div className="flex max-w-[300px] flex-col gap-6">
            <div className="flex flex-col items-center gap-1">
              <h2 className="max-h-[68px] max-w-[232px] text-center text-4xl font-bold">
                상사와 의견이 다를 때 <br />
                어떻게 대처하실 건가요?
              </h2>
              <div className="text-sm text-gray-500">3일 09:10:43후 종료</div>
            </div>
            <div className="relative h-[175px] w-[300px]">
              <Image
                fill
                className="rounded-xl"
                src="https://via.placeholder.com/300x175"
                alt="기출 이미지"
              />
            </div>

            <Button size={'sm'} variant={'default'}>
              나도 답변 만들기
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative flex items-center">
              <Avatar className="relative ml-[-12px] size-[30px]">
                <AvatarImage src="/images/suri-profile.svg" alt="@shadcn" />
                <AvatarFallback>기본이미지</AvatarFallback>
              </Avatar>
              <Avatar className="relative ml-[-12px] size-[30px]">
                <AvatarImage src="/images/suri-profile.svg" alt="@shadcn" />
                <AvatarFallback>기본이미지</AvatarFallback>
              </Avatar>
              <Avatar className="relative ml-[-12px] size-[30px]">
                <AvatarImage src="/images/suri-profile.svg" alt="@shadcn" />
                <AvatarFallback>기본이미지</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-xs text-gray-600">
              24명이 답변을 남기고 갔어요!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
