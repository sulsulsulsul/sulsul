export type PracticedQuestionTabType = 'unanswered' | 'hint-used' | 'favorites';
export type PracticeStatusChartTabType = 'weekly' | 'monthly';

export interface StatisticsSummaryResponse {
  answerCount: number;
  notAnswerCount: number;
  totalPracticeTime: number;
}
