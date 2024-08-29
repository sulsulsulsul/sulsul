import { HTMLAttributes } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionState } from '@/entities/practice/types';
import { QuestionSearchType } from '@/entities/types/question';
import { cn } from '@/lib/utils';

interface PracticedListTabType extends HTMLAttributes<HTMLDivElement> {
  allCount: number;
  unansweredCount: number;
  answeredCount: number;
  isLoading: boolean;
  onTabChange: (value: QuestionState) => void;
}

export const PracticeListTab = ({
  className,
  allCount,
  unansweredCount,
  answeredCount,
  isLoading,
  onTabChange,
  ...props
}: PracticedListTabType) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        onValueChange={(value) => {
          onTabChange(value as QuestionState);
        }}
        defaultValue="all"
      >
        <TabsList>
          <TabsTrigger value="all" disabled={isLoading}>
            전체 {allCount > 0 && <>{allCount}</>}
          </TabsTrigger>
          <TabsTrigger value="answer" disabled={isLoading}>
            답변한 {answeredCount > 0 && <>{answeredCount}</>}
          </TabsTrigger>
          <TabsTrigger value="not_answer" disabled={isLoading}>
            답변못한 {unansweredCount > 0 && <>{unansweredCount}</>}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
