import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { AuthSignedOut } from '@/components/auth/auth-signed-out';
import { cn } from '@/lib/utils';

interface ValidInterviewQuestionProps extends HTMLAttributes<HTMLDivElement> {}

export const ValidStatus = ({
  className,
  ...props
}: ValidInterviewQuestionProps) => {
  return (
    <div
      className={cn('h-full bg-white rounded-md shadow-base', className)}
      {...props}
    >
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <div className="relative rounded-md bg-blue-100 px-6 py-4">
          <div className="text-center text-blue-500">
            <p>이제 예상질문 생성하기</p>
            <p>버튼을 눌러보세요!</p>
          </div>
          <div className="absolute bottom-0 left-1/2 size-[14px] -translate-x-1/2 translate-y-1/2 rotate-45 bg-blue-100" />
        </div>
        <Image
          src={'/images/character-curious.svg'}
          width={160}
          height={140}
          alt="궁금해하는 술술이"
        />
        <AuthSignedOut>
          <div className="mt-3 font-semibold text-gray-500">
            미리 체험해보고 싶다면?{' '}
            <span className="cursor-pointer font-normal underline">
              샘플 자소서로 해보기
            </span>
          </div>
        </AuthSignedOut>
      </div>
    </div>
  );
};
