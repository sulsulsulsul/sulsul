'use client';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { PracticedQuestionCard } from '../practice-question-card';
import { PracticedQuestionTab } from '../practice-question-tab';
import PracticeSectionHeader from '../practice-section-header';

const QuestionsMock = [
  {
    question: 'MVP 테스트를 진행하는 과정에서 어려웠던 점은 무엇이었나요?',
    title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
    company: '배달의민족',
  },
  {
    question:
      '화재 대피요령을 계단 스티커를 통해 전달하는 아이디어는 어떻게 전달될까요?',
    title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
    company: '여기어때',
  },
  {
    question:
      '화재 대피요령을 계단 스티커를 통해 전달하는 아이디어는 어떻게 전달될까요?',
    title: '팀으로 함께 성과를 만들어낸 경험을 작성해주세요.',
    company: '카카오',
  },
];

export interface PracticeQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  practiceList?: unknown; // TODO: API
}

const PracticeQuestions = ({
  practiceList,
  className,
}: PracticeQuestionsProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center">
        <PracticeSectionHeader
          title="연습한 면접질문"
          iconSrc="/images/icons/etc-speech.svg"
        />
      </div>
      <PracticedQuestionTab
        className="mt-3 flex items-center gap-1"
        favoriteCount={10}
        hintUsedCount={10}
        unansweredCount={10}
      />
      {QuestionsMock?.length && (
        <div className="mt-6 flex h-[318px] flex-col gap-3 overflow-y-scroll scrollbar-hide">
          {QuestionsMock.map((question, index) => (
            <PracticedQuestionCard
              key={`${question.company}-${index}`}
              {...question}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeQuestions;
