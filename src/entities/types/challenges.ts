export interface MyChallengesProgressData {
  category: string;
  count: number;
}

export interface MyQuestionList {
  answerRate: number;
  challenges: [
    {
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
