'use client';
import { HTMLAttributes, useState } from 'react';

import { SearchQuestion } from '@/entities/questions/types';
import { cn } from '@/lib/utils';

import type { PracticedQuestionTabType } from '../../types';
import NoDataCard from '../no-data-card';
import { PracticedQuestionCard } from '../practice-question-card';
import PracticedQuestionCarousel from '../practice-question-carousel';
import { PracticedQuestionTab } from '../practice-question-tab';
import PracticeSectionHeader from '../practice-section-header';

export interface PracticeQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  hintUsedQuestions: SearchQuestion;
  favoriteQuestions: SearchQuestion;
  unansweredQuestions: SearchQuestion;
  isDesktop?: boolean;
}

const PracticeQuestions = ({
  className,
  hintUsedQuestions,
  unansweredQuestions,
  favoriteQuestions,
  isDesktop,
}: PracticeQuestionsProps) => {
  const questions = {
    hintUsed: hintUsedQuestions,
    unanswered: unansweredQuestions,
    favorite: favoriteQuestions,
  };

  const [selectedTab, setSelectedTab] =
    useState<PracticedQuestionTabType>('unanswered');

  const onChangeTab = (tab: PracticedQuestionTabType) => {
    setSelectedTab(tab);
  };

  return (
    <div className={cn(className, 'w-full')}>
      <div className="flex items-center">
        <PracticeSectionHeader
          title="연습한 면접질문"
          iconSrc="/images/icons/etc-speech.svg"
        />
      </div>
      <PracticedQuestionTab
        className="mt-3 flex items-center gap-1"
        selectedTab={selectedTab}
        onChangeTab={onChangeTab}
      />
      {isDesktop ? (
        <div className=" mr-3 flex h-[420px] flex-col gap-3 overflow-y-scroll px-3 pb-4 pt-6 scrollbar-hide mobile:mt-4">
          {questions[selectedTab].contents.length > 0 ? (
            questions[selectedTab].contents
              .slice(0, 10)
              .map((question, index) => (
                <PracticedQuestionCard
                  key={`${question.questionId}_${index}`}
                  content={question.content}
                  title={question.archive.title}
                  company={question.archive.companyName}
                  resumeId={question.archive.archiveId}
                  questionId={question.questionId}
                />
              ))
          ) : (
            <NoDataCard />
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col scrollbar-hide mobile:mt-4">
          {questions[selectedTab].contents.length > 0 ? (
            <PracticedQuestionCarousel
              questions={questions[selectedTab].contents}
            />
          ) : (
            <NoDataCard />
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeQuestions;
