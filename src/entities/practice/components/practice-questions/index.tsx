'use client';
import { HTMLAttributes, useState } from 'react';

import { SearchQuestion } from '@/entities/questions/types';
import { cn } from '@/lib/utils';

import type { PracticedQuestionTabType } from '../../types';
import NoDataCard from '../no-data-card';
import { PracticedQuestionCard } from '../practice-question-card';
import { PracticedQuestionTab } from '../practice-question-tab';
import PracticeSectionHeader from '../practice-section-header';

export interface PracticeQuestionsProps extends HTMLAttributes<HTMLDivElement> {
  hintUsedQuestions: SearchQuestion;
  favoriteQuestions: SearchQuestion;
  unansweredQuestions: SearchQuestion;
}

const PracticeQuestions = ({
  className,
  hintUsedQuestions,
  unansweredQuestions,
  favoriteQuestions,
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
    <div className={cn(className)}>
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
      <div className="mt-6 flex h-[318px] flex-col gap-3 overflow-y-scroll scrollbar-hide">
        {questions[selectedTab].contents.length > 0 ? (
          questions[selectedTab].contents.map((question) => (
            <PracticedQuestionCard
              key={question.questionId}
              content={question.content}
              title={question.archive.title}
              company={question.archive.companyName}
            />
          ))
        ) : (
          <NoDataCard />
        )}
      </div>
    </div>
  );
};

export default PracticeQuestions;
