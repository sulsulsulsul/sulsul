import { useMutation } from '@tanstack/react-query';

import {
  createPracticeQuestion,
  PracticeQuestionProp,
} from '../action/create-practice-quesiton';
// import { QuestionStarState, updateQuestionStar } from '../actions/update-star';

export const useCreatePracticeQuestion = () => {
  return useMutation({
    mutationFn: ({ questionId, practiceTimeSec }: PracticeQuestionProp) =>
      createPracticeQuestion({
        questionId: questionId,
        practiceTimeSec: practiceTimeSec,
      }),
  });
};
