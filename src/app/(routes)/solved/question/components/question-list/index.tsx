'use client';

import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { KeywordSet } from '@/entities/archives/components/keyword-section/keyword';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useUserQuestionList } from './hook/use-user-question-list';

import helpCircle from '/public/images/icons/help-circle.svg';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const QuestionList = ({ className }: QuestionListProps) => {
  // user
  const { auth } = useUserStore();
  const accessToken = auth!.accessToken;
  // question list data
  const { data } = useUserQuestionList({
    accessToken,
    category: 'BASIC',
  });

  // React Hook Form 사용
  const form = useForm({
    defaultValues: {
      answer: '', // answer 필드의 기본값 설정
    },
    mode: 'onChange',
  });
  const { handleSubmit, watch, setFocus } = form;
  const answerLength = watch('answer').length; // answer의 길이를 확인

  // 여기서 폼 데이터를 처리
  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <>
      <div className={cn('h-full', className)}>
        <div className="flex h-full w-[690px] flex-col gap-3 p-[10px]">
          {data?.challenges.map((question) => (
            <div
              key={question.content}
              className="rounded-md border border-gray-200 bg-white p-[7px] px-7 shadow-base"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="flex items-start gap-2">
                    <span className="relative top-[7px] mr-1 size-[9.6px] min-w-[9.6px] rounded-full bg-gray-200" />
                    <p className="w-full text-left">{question.content}</p>
                  </AccordionTrigger>
                  <AccordionContent className="h-auto py-[10px] ">
                    <div className="pb-5 pl-4">
                      <Form {...form}>
                        <div>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-[580px]"
                          >
                            <FormField
                              control={form.control}
                              name="answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Textarea
                                        className="relative resize-none rounded-base p-4"
                                        rows={11}
                                        {...field}
                                      />
                                      {!answerLength && (
                                        <div
                                          onClick={() =>
                                            form.setFocus('answer')
                                          }
                                          className="absolute left-5 top-5 z-10 cursor-default text-gray-500"
                                        >
                                          <h2 className="mb-1 text-base font-semibold">
                                            아래와 같이 답변을 구성해보세요.
                                          </h2>
                                          <div className="relative h-fit text-base">
                                            <p className="mb-1 flex items-center gap-2">
                                              <span className="relative flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                                                1
                                                <div className="absolute left-1/2 top-full h-[12px] -translate-x-1/2 border border-gray-200" />
                                              </span>
                                              결론 · 핵심 메세지
                                            </p>
                                            <p className="mb-1 flex items-center gap-2">
                                              <span className="relative -z-10 flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                                                2
                                                <div className="absolute left-1/2 top-full -z-10 h-[12px] -translate-x-1/2 border border-gray-200" />
                                              </span>
                                              1번을 뒷받침할 근거와 예시
                                            </p>
                                            <p className="flex items-center gap-2">
                                              <span className="flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                                                3
                                              </span>
                                              정리하며 강조
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      <div className="absolute bottom-4 right-1/2 flex w-[calc(100%-32px)] translate-x-1/2 items-end justify-between">
                                        <div className="flex flex-col gap-px text-2xs">
                                          <div>
                                            <span className="text-gray-600">
                                              {answerLength ?? 0}
                                            </span>
                                            <span className="text-gray-400">
                                              /500자
                                            </span>
                                          </div>
                                          <FormMessage />
                                        </div>
                                        <div className="flex gap-1">
                                          {!answerLength ? (
                                            <Button
                                              size={'sm'}
                                              disabled
                                              type="submit"
                                            >
                                              저장하기
                                            </Button>
                                          ) : (
                                            <Button size={'sm'} type="submit">
                                              저장하기
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </form>
                        </div>
                      </Form>
                      <div className={'mt-6'}>
                        <h3 className="flex items-center">
                          <span className="font-semibold">키워드 노트</span>
                          <TooltipProvider>
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger>
                                <Image
                                  src={helpCircle}
                                  alt="도움말 아이콘"
                                  className="ml-1"
                                  width={20}
                                  height={20}
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                className="p-3 text-xs"
                                side="right"
                              >
                                <p>
                                  답변 자체를 암기하기보단 핵심 키워드를 정리한
                                  후
                                </p>
                                <p>키워드를 중심으로 답변하는 것이 좋아요.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          <KeywordSet
                            // keywords={keywords}
                            questionId={1}
                          />
                          <Input
                            className="w-fit gap-2 rounded-sm border border-gray-300 bg-white text-base font-medium text-black"
                            placeholder="+ 직접 쓰기"
                            // value={inputValue}
                            // onChange={handleInputChange}
                            // onKeyDown={handleCreateKeyword}
                            // ref={inputRef}
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold ">
                          내 답변 피드백
                        </h3>
                        <div className="mt-2 w-[580px]">
                          {/* {!feedback && ( */}
                          <div>
                            <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
                              {/* {isLoading ? (
                                  <FeedbackSectionPending />
                                ) : ( */}
                              <>
                                <p>피드백 받기 버튼을 누르면</p>
                                <p>내 답변에 대한 피드백을 받을 수 있어요!</p>
                                <div className="mt-4">
                                  <Button
                                    size="sm"
                                    // onClick={handleCreateFeedback}
                                    // disabled={!isAnswered}
                                  >
                                    <span className="text-base font-semibold">
                                      피드백 받기
                                    </span>
                                  </Button>
                                </div>
                              </>
                              {/* ) */}
                            </div>
                          </div>
                          {/* )} */}

                          {/* {feedback?.content && (
                              <FeedbackSectionComplete
                                goodFeedback={feedback?.goodPoint}
                                badFeedback={feedback?.improvePoint}
                                isAnswerChanged={isAnswerChanged}
                                handleAnswerChanged={handleAnswerChanged}
                                questionId={questionId}
                              />
                        )} */}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionList;
