import { HTMLAttributes } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { PracticedQuestionTabType } from '../../types';

interface PracticedQuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  selectedTab: PracticedQuestionTabType;
  unansweredCount: number;
  hintUsedCount: number;
  favoriteCount: number;
  onChangeTab: (value: PracticedQuestionTabType) => void;
}

export const PracticedQuestionTab = ({
  className,
  selectedTab,
  unansweredCount,
  hintUsedCount,
  favoriteCount,
  onChangeTab,
  ...props
}: PracticedQuestionTabProps) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          onChangeTab(value as PracticedQuestionTabType);
        }}
      >
        <TabsList>
          <TabsTrigger value="unanswered">
            답하지 못했던 {unansweredCount}
          </TabsTrigger>
          <TabsTrigger value="hintUsed">힌트를 본 {hintUsedCount}</TabsTrigger>
          <TabsTrigger value="favorite">
            즐겨 찾기한 {favoriteCount}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
