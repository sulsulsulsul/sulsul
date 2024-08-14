import { useMutation } from '@tanstack/react-query';

import { QuestionStarState, updateQuestionStar } from '../actions/update-star';

export const useUpdateQuestionStar = () => {
  return useMutation({
    mutationFn: ({ questionId, star }: QuestionStarState) =>
      updateQuestionStar({
        questionId: questionId,
        star: !star,
      }),
  });
};
