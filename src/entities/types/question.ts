import { FeedbackDTO } from './feedback';
import { KeywordDTO } from './keyword';

export interface ModalQuestionType {
  questionId: number;
  content: string;
  answer: string;
  isAnswered: boolean;
  isHint: boolean;
  keywords: KeywordDTO[];
}

export interface QuestionSearchType {
  questionId: number;
  content: string;
  practiceStatus: 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
  practiceCount: number;
  practiceTime: number;
  hint: boolean;
  star: boolean;
  lastPracticeAt: string;
  archive: {
    archiveId: number;
    companyName: string;
    title: string;
  };
}

export interface PracticeQuestionListType {
  page: number;
  size: number;
  totalPage: number;
  totalCount: number;
  contents: QuestionSearchType[];
}

export interface SearchParam {
  practiceStatus?: 'ALL' | 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
  userId?: number;
  hint?: string;
  star?: boolean;
  page?: number;
  size?: number;
}

export interface ModalQuestionDetail {
  content: string;
  baseStartIndex: number;
  baseEndIndex: number;
  answer: string;
  isAnswered: boolean;
  isStar: boolean;
  isHint: boolean;
  practiceCount: number;
  practiceTime: number;
  hint: boolean;
  star: boolean;
  practiceStatus: 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
  lastPracticeAt: string;
  feedback: FeedbackDTO[];
  keywords: KeywordDTO[];
}
