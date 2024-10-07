'use client';
import { HTMLAttributes, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { KeywordSection } from '@/entities/archives/components/keyword-section';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';
import useQuestionTypeStore from '@/store/questionListTypeStore';
import { useQuestionListStore } from '@/store/questListStore';

import { useUserQuestionList } from '../../hook/use-user-question-list';
import AnswerForm from './answer-form';
import Feedback from './feedback';

interface QuestionListProps extends HTMLAttributes<HTMLDivElement> {}

const QuestionList = ({ className }: QuestionListProps) => {
  const { auth } = useUserStore();
  const accessToken = auth!.accessToken;
  const [isAnswerChanged, setIsAnswerChanged] = useState(false);
  const categoryList = [
    'BASIC',
    'JOB_1',
    'JOB_2',
    'CULTURE_1',
    'CULTURE_2',
    'VISION',
  ];
  const [index, setIndex] = useState(0);
  const setQuestions = useQuestionListStore((state) => state.setQuestions);
  const { selectedCategory, setSelectedCategory } = useQuestionTypeStore(
    (state) => ({
      selectedCategory: state.selectedCategory,
      setSelectedCategory: state.setSelectedCategory,
    }),
  );
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지 로직
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data } = useUserQuestionList({
    accessToken,
    category: selectedCategory,
  });

  // 질문 리스트 저장
  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  // 응답률이 100 이면 다음 카테고리 선택 로직
  useEffect(() => {
    // index가 6 이상이 되면 5로 고정
    if (
      data &&
      data.answerRate === 100 &&
      selectedCategory === categoryList[index] &&
      !categoryList.includes(selectedCategory) // 카테고리가 수동으로 설정된 경우 자동 변경 방지
    ) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex >= 6 ? 5 : newIndex;
      });
    }
  }, [data, selectedCategory]);

  useEffect(() => {
    if (!categoryList.includes(selectedCategory)) {
      setSelectedCategory(categoryList[index]);
    }
  }, [index, selectedCategory]);

  // 모바일에서 아코디언 클릭 액션
  const handleAccordionClick = (e: any) => {
    if (isMobile) {
      e.preventDefault();
      toast('PC버전으로 접속해주세요', {
        className:
          'w-[343px] h-[53px] bg-gray-800 text-white px-4 mt-12 desktop:hidden',
        position: 'top-center',
        dismissible: true,
        style: {
          background: '#2B2D35',
          color: 'white',
          border: 'none',
        },
      });
    }
  };

  return (
    <div className={cn('h-full w-full', className)}>
      <div className="flex size-full flex-col gap-3 mobile:px-[16px]">
        {data === undefined && (
          <div className="flex flex-col">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className="mb-3 h-[70px] w-full bg-gray-100"
                />
              ))}
          </div>
        )}
        {data?.challenges.map((question) => (
          <div
            key={question.content}
            className="rounded-md border border-gray-200 bg-white p-[7px] px-7 shadow-base"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger
                  className="flex items-start justify-between gap-2 mobile:items-center"
                  onClick={handleAccordionClick}
                >
                  <span
                    className={`relative top-[7px] mr-1 size-[9.6px] min-w-[9.6px] rounded-full mobile:top-0 ${question.isAnswered ? 'bg-blue-500' : 'bg-gray-200'}`}
                  />
                  <p className="w-full text-left">{question.content}</p>
                  <svg className="hidden" />
                </AccordionTrigger>
                <AccordionContent className="h-auto py-[10px] ">
                  <div className="pb-5 pl-4">
                    <AnswerForm
                      accessToken={accessToken}
                      hasAnswer={question.question && question.question.answer}
                      challengeId={question.challengeId}
                      setIsAnswerChanged={setIsAnswerChanged}
                      category={selectedCategory}
                    />
                    <KeywordSection
                      accessToken={accessToken}
                      questionId={question.challengeId}
                      className="mt-6"
                      type={'challenge'}
                      challengeKeywordData={
                        question.question && question.question.keywords
                      }
                      category={selectedCategory}
                      challengeQuestionId={
                        question.question && question.question.questionId
                      }
                    />
                    <Feedback
                      questionId={
                        question.question && question.question.questionId
                      }
                      isAnswered={question.isAnswered}
                      isAnswerChanged={isAnswerChanged}
                      setIsAnswerChanged={setIsAnswerChanged}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
