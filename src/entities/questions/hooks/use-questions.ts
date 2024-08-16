import { useQuery } from '@tanstack/react-query';

import { getQuestionsAction } from '../actions/get-questions';

export const useQuestions = (questionId: number) => {
  const result = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => getQuestionsAction(questionId),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    question: data,
  };
};
