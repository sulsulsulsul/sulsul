import { KeywordDTO } from './keyword';

export interface ModalQuestionType {
  questionId: number;
  content: string;
  answer: string;
  isAnswered: boolean;
  isHint: boolean;
  keywords: KeywordDTO[];
}

export interface QuestionDetailType {
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
  contents: QuestionDetailType[];
}

export interface SearchParam {
  practiceStatus: 'ALL' | 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
  hint?: string;
  star?: boolean;
  page?: number;
  size?: number;
}
