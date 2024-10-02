'use client';

import { HTMLAttributes, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { KeywordSection } from '@/entities/archives/components/keyword-section';
import { useFeedback } from '@/entities/feedbacks/hooks/use-feedback';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useUserQuestionList } from '../../hook/use-user-question-list';
import AnswerForm from './answer-form';
import Feedback from './feedback';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

interface challengeKeywordDataType {
  keywordId: number;
  content: string;
}

const QuestionList = ({ className }: QuestionListProps) => {
  // user
  const { auth } = useUserStore();
  const accessToken = auth!.accessToken;
  // question list data
  const { data } = useUserQuestionList({
    accessToken,
    category: 'BASIC',
  });

  console.log(data);

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
                      <AnswerForm
                        accessToken={accessToken}
                        hasAnswer={
                          question.question && question.question.answer
                        }
                        challengeId={question.challengeId}
                      />
                      {/* <Keyword /> */}
                      <KeywordSection
                        accessToken={accessToken}
                        questionId={question.challengeId}
                        className="mt-6"
                        type={'challenge'}
                        challengeKeywordData={
                          question.question && question.question.keywords
                        }
                        category="BASIC"
                        challengeQuestionId={
                          question.question && question.question.questionId
                        }
                      />
                      <Feedback
                        questionId={
                          question.question && question.question.questionId
                        }
                        isAnswered={question.isAnswered}
                      />
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
