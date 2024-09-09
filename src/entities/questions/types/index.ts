export type PracticeStatus = 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';

export interface SearchQuestionContent {
  questionId: number;
  content: string;
  practiceStatus: PracticeStatus;
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

// TODO: 페이지 관련 타입 공통 선언
export interface SearchQuestion {
  page: number;
  size: number;
  totalPage: number;
  totalCount: number;
  contents: SearchQuestionContent[];
}
