import { HTMLAttributes } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionAnswerForm } from '@/entities/archives/components/question-answer-form';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { cn } from '@/lib/utils';

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
    <div className="mt-[18px] flex size-full  flex-col gap-3">
      {SAMPLE_QUESTIONS.map((sampleQuestion, idx) => (
        <AlertDialog key={sampleQuestion}>
          <div className="rounded-md border border-gray-200 shadow-base">
            <div className="rounded-md bg-white pl-4 pr-7">
              <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value={`item-${idx}`} className="border-none">
                  <AccordionTrigger>
                    <div className="flex cursor-pointer  flex-col justify-center ">
                      <div className="flex w-full items-center justify-start gap-2.5 border-none">
                        <div className="size-[9.6px] min-w-[9.6px] rounded-full bg-gray-200" />
                        <div className=" w-[596px] resize-none py-2 text-lg">
                          <p className="w-full whitespace-break-spaces break-keep text-left font-semibold text-gray-700">
                            {sampleQuestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={cn('flex flex-col gap-2 pb-5 pl-4')}>
                      <AlertDialogTrigger>
                        <QuestionAnswerForm />
                      </AlertDialogTrigger>
                      <div className={cn('mt-6')}>
                        <h3 className="flex items-center">
                          <span className="font-semibold">키워드 노트</span>
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          <AlertDialogTrigger>
                            <Input
                              placeholder="+ 직접 쓰기"
                              className="w-fit gap-1 rounded-sm border border-gray-300 bg-white text-base font-medium text-black"
                            ></Input>
                          </AlertDialogTrigger>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold">
                          내 답변 피드백
                        </h3>
                        <div className="mt-2">
                          <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
                            <p>피드백 받기 버튼을 누르면</p>
                            <p>내 답변에 대한 피드백을 받을 수 있어요!</p>
                            <div className="mt-4">
                              <AlertDialogTrigger>
                                <Button size="sm">
                                  <span className="text-base font-semibold">
                                    피드백 받기
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
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
