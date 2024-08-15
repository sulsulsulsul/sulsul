import { HTMLAttributes } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionState } from '@/entities/practice/types';
import { cn } from '@/lib/utils';

interface PracticedListTabType extends HTMLAttributes<HTMLDivElement> {
  allCount: number;
  unansweredCount: number;
  answeredCount: number;
  onTabChange: (value: QuestionState) => void;
}

export const PracticeListTab = ({
  className,
  allCount,
  unansweredCount,
  answeredCount,
  onTabChange,
  ...props
}: PracticedListTabType) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        onValueChange={(value) => {
          onTabChange(value as QuestionState);
        }}
        defaultValue="unanswered"
      >
        <TabsList>
          <TabsTrigger value="all">
            전체{allCount > 0 && <>{allCount}</>}
          </TabsTrigger>
          <TabsTrigger value="">
            답변한{answeredCount > 0 && <>{answeredCount}</>}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            답변못한 {unansweredCount > 0 && <>{unansweredCount}</>}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
