'use client';

import { HTMLAttributes } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { KeywordSection } from '@/entities/archives/components/keyword-section';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useUserQuestionList } from '../../hook/use-user-question-list';
import AnswerForm from './answer-form';
import Feedback from './feedback';
import Keyword from './keyword';

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
  console.log(data);

  return (
    <>
      <div className={cn('h-full', className)}>
        <div className="flex h-full w-[690px] flex-col gap-3 p-[10px]">
          {data?.challenges.map((question, idx) => (
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
                        idx={idx}
                        hasAnswer={
                          question.question && question.question.answer
                        }
                      />
                      {/* <Keyword /> */}
                      <KeywordSection questionId={1} />
                      <Feedback />
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
