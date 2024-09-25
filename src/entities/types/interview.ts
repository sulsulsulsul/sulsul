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
  content: string;
  recommendCount: number;
}
export interface AnswerList {
  totalCount: number;
  answerDetailResponses: AnswerListData[];
}

export interface MyAnswerData {
  myWriteAnswerData: AnswerListData;
}
