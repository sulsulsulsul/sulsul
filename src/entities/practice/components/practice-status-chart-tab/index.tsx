import { HTMLAttributes } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { Period } from '../../types';

interface PracticedQuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  chartType: Period;
  onChangeChartType: (value: Period) => void;
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
          onChangeChartType(value as Period);
        }}
      >
        <TabsList>
          <TabsTrigger
            className="mobile:rounded-sm mobile:text-[14px] mobile:font-semibold"
            value="WEEKLY"
          >
            주간
          </TabsTrigger>
          <TabsTrigger
            className="mobile:rounded-sm mobile:text-[14px] mobile:font-semibold"
            value="MONTHLY"
          >
            월간
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
