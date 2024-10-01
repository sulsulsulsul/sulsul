export interface MyActivityData {
  total: string;
  current: number;
}

export interface InterviewData {
  answerCount: number;
  profileImgs: string[];
  weeklyInterviewId: number;
  content: string;
  year: number;
  week: number;
  startDateTime: string;
  endTime: string;
}

export interface AnswerListData {
  weeklyInterviewAnswerId: number;
  userId: number;
  nickname: string;
  profileImg: string;
  job: string;
  content: string;
  recommendCount: number;
  isRecommended: boolean;
}
export interface AnswerList {
  page: number;
  size: number;
  totalPage: number;
  totalCount: number;
  answers: AnswerListData[];
}
