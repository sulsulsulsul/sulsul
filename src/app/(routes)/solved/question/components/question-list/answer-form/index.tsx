'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MyQuestionList } from '@/entities/types/challenges';

import { useCreateMostFrequentAnswer } from '../../../hook/use-create-most-frequent-answer';

const AnswerForm = ({
  accessToken,
  idx,
  hasAnswer,
}: {
  accessToken: string;
  idx: number;
  hasAnswer: string | null;
}) => {
  // React Hook Form 사용
  const form = useForm({
    defaultValues: {
      answer: '',
    },
    mode: 'onChange',
  });
  const { handleSubmit, watch, setFocus, setValue } = form;
  const answerLength = watch('answer').length;
  const category = 'BASIC';

  useEffect(() => {
    if (hasAnswer) {
      setValue('answer', hasAnswer);
      setFocus('answer', { shouldSelect: false }); // 커서 글자 뒤에 forcus
    }
  }, [hasAnswer, setValue, setFocus]);

  const { mutate: createMostFrequentAnswerMutation } =
    useCreateMostFrequentAnswer({ accessToken, category });

  // 여기서 폼 데이터를 처리
  const onSubmit = (data: any) => {
    createMostFrequentAnswerMutation({
      challengeId: 1,
      accessToken: accessToken,
      answer: data.answer,
    });
  };

  return (
    <Form {...form}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[580px]">
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
                    {!answerLength && hasAnswer === null ? (
                      <div
                        onClick={() => form.setFocus('answer')}
                        className="absolute left-5 top-5 z-10 cursor-default text-gray-500"
                      >
                        <h2 className="mb-1 text-base font-semibold">
                          아래와 같이 답변을 구성해보세요.
                        </h2>
                        <div className="relative h-fit text-base">
                          <p className="mb-1 flex items-center gap-2">
                            <span className="relative flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                              1
                              <span className="absolute left-1/2 top-full h-[12px] -translate-x-1/2 border border-gray-200" />
                            </span>
                            결론 · 핵심 메세지
                          </p>
                          <p className="mb-1 flex items-center gap-2">
                            <span className="relative -z-10 flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[10px] text-white">
                              2
                              <span className="absolute left-1/2 top-full -z-10 h-[12px] -translate-x-1/2 border border-gray-200" />
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
                    ) : (
                      <div
                        onClick={() => form.setFocus('answer')}
                        className="absolute left-5 top-5 z-10 cursor-default text-gray-500"
                      ></div>
                    )}
                    <div className="absolute bottom-4 right-1/2 flex w-[calc(100%-32px)] translate-x-1/2 items-end justify-between">
                      <div className="flex flex-col gap-px text-2xs">
                        <div>
                          <span className="text-gray-600">
                            {!answerLength && hasAnswer === null
                              ? (answerLength ?? 0)
                              : hasAnswer?.length}
                          </span>
                          <span className="text-gray-400">/500자</span>
                        </div>
                        <FormMessage />
                      </div>
                      <div className="flex gap-1">
                        {!answerLength && hasAnswer === null ? (
                          <Button size={'sm'} disabled type="submit">
                            저장하기
                          </Button>
                        ) : answerLength && hasAnswer === null ? (
                          <Button size={'sm'} type="submit">
                            저장하기
                          </Button>
                        ) : (
                          <Button size="sm" type="submit" disabled={false}>
                            수정하기
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
  );
};

export default AnswerForm;
