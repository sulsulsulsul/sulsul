import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const TogetherSolvedContent = () => {
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <h2 className="max-h-[68px] max-w-[232px] text-center text-4xl font-bold">
          상사와 의견이 다를 때 <br />
          어떻게 대처하실 건가요?
        </h2>
        <div className="text-sm text-gray-500">3일 09:10:43후 종료</div>
      </div>
      <div className="relative h-[175px] w-full">
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
  );
};
