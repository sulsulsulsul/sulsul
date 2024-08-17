import { HTMLAttributes } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { PracticeStatusChartTabType } from '../../types';

interface PracticedQuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  chartType: PracticeStatusChartTabType;
  onChangeChartType: (value: PracticeStatusChartTabType) => void;
}

export const PracticedStatusChartTab = ({
  className,
  chartType,
  onChangeChartType,
  ...props
}: PracticedQuestionTabProps) => {
  return (
    <div className={cn(className)} {...props}>
      <Tabs
        value={chartType}
        onValueChange={(value) => {
          onChangeChartType(value as PracticeStatusChartTabType);
        }}
      >
        <TabsList>
          <TabsTrigger value="weekly">주간</TabsTrigger>
          <TabsTrigger value="monthly">월간</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
