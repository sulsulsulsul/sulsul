import { useMutation } from '@tanstack/react-query';

import { updateHintAction } from '../action/use-hint';

export const useUpdateHint = () => {
  return useMutation({
    mutationFn: (practiceId: number) => updateHintAction(practiceId),
  });
};
