export interface MyChallengesProgressData {
  category: string;
  count: number;
}

export interface MyQuestionList {
  answerRate: number;
  challenges: [
    {
      challengeId: number;
      content: string;
      isAnswered: false;
      question: {
        questionId: number;
        answer: null | string;
        keywords: [
          {
            keywordId: number;
            content: string;
          },
        ];
        feedback: null | string;
      };
    },
  ];
}

export interface MyTotalChallengesProgressData {
  totalCount: number;
  percent: number;
}
