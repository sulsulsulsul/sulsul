export type PracticedQuestionTabType = 'unanswered' | 'hintUsed' | 'favorite';

export interface StatisticsSummary {
  answerCount: number;
  notAnswerCount: number;
  totalPracticeTime: number;
}

export interface StatisticsDetail {
  label: string;
  count: number;
}

export type Period = 'WEEKLY' | 'MONTHLY';
export type FilterType = 'recent' | 'old' | 'mostCount' | 'leastCount';
export type HintType = 'on' | 'off' | 'default';
export type QuestionState = 'ALL' | 'ANSWER' | 'NOT_ANSWER';
