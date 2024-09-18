import { HTMLAttributes } from 'react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';

import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { cn } from '@/lib/utils';

import dropdown from '/public/images/icons/dropdown.svg';

interface ValidInterviewQuestionProps extends HTMLAttributes<HTMLDivElement> {}

export const CompleteStatus = ({
  className,
  ...props
}: ValidInterviewQuestionProps) => {
  const SAMPLE_QUESTIONS = [
    '팀 내에서 주요 역할은 무엇이었으며, 그 역할을 수행하면서 어떤 역량을 발휘했나요?',
    '화재 대피요령을 계단 스티커를 통해 전달하는 아이디어는 어떻게 도출됐나요?',
    '서울교통공사와 협력하여 솔루션을 승인받는 과정에서 어떤 어려움을 겪었고, 그것을 해결하기 위해 어떤 전략을 사용했는지 설명해주세요.',
    'MVP 테스트를 진행하는 과정에서 어려웠던 점은 무엇이었나요?',
    'MVP 테스트를 진행하면서 얻은 피드백 중에서 가장 기억에 남는 것은 무엇이었나요?',
    '팀원들과의 협업 과정에서 특별히 어려웠던 부분이 있었나요?',
  ];

  return (
    <div className="mt-[18px] flex size-full cursor-pointer flex-col gap-3">
      {SAMPLE_QUESTIONS.map((sampleQuestion, idx) => (
        <AlertDialog key={idx}>
          <AlertDialogTrigger asChild>
            <div className="text-nowrap  rounded-md border border-gray-200 bg-white pl-4 pr-7 shadow-base">
              <div className="relative flex w-full items-center justify-start gap-2 border-none py-2 pr-7">
                <div className="size-[9.6px] min-w-[9.6px] rounded-full bg-gray-200" />
                <div className=" w-[500px] resize-none py-7 text-lg">
                  <p className="w-full whitespace-break-spaces break-keep">
                    {sampleQuestion}
                  </p>
                </div>
                <Image
                  src={dropdown}
                  alt="드롭다운 아이콘"
                  width={24}
                  height={24}
                  className="absolute right-0"
                />
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn('absolute left-0 top-0')}>
            <AlertDialogTitle />
            <AlertDialogDescription />
            <SignInView callbackUrl="/" />
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  );
};
