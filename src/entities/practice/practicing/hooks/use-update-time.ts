import { useMutation } from '@tanstack/react-query';

import { updateTimerAction } from '../action/update-time';

export const useUpdateTime = () => {
  return useMutation({
    mutationFn: ({ practiceId, time }: { practiceId: number; time: number }) =>
      updateTimerAction({ practiceId, time }),
  });
};
