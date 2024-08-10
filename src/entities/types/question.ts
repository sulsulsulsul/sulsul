export interface QuestionDetailType {
  content: string;
  baseStartIndex: number;
  baseEndIndex: number;
  answer: string;
  isAnswered: boolean;
  isStar: boolean;
  isHint: boolean;
  practiceCount: number;
  practiceTime: number;
  practiceStatus: 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
  feedback: {
    feedbackId: number;
    goodPoint: string;
    improvePoint: string;
    content: string;
    status: 'READY'; //Ask
  };
  keywords: [
    {
      keywordId: number;
      content: string;
    },
  ];
}
