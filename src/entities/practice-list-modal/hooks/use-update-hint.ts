import { useMutation } from '@tanstack/react-query';

import { updateHintAction } from '../actions';

export const useUpdateHint = () => {
  return useMutation({
    mutationFn: (practiceId: number) => updateHintAction(practiceId),
  });
};
