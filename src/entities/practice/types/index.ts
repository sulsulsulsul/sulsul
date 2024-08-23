export type PracticedQuestionTabType = 'unanswered' | 'hintUsed' | 'favorite';
export type PracticeStatusChartTabType = 'weekly' | 'monthly';

export interface StatisticsSummary {
  answerCount: number;
  notAnswerCount: number;
  totalPracticeTime: number;
}

export interface StatisticsDetail {
  label: string;
  count: number;
}

export type Period = 'WEEKLY' | 'MONTH';
