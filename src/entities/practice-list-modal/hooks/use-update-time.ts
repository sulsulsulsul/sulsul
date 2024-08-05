import { useMutation } from '@tanstack/react-query';

import { updateTimerAction } from '../actions';

export const useUpdateTime = ({
  practiceId,
  time,
}: {
  practiceId: number;
  time: number;
}) => {
  return useMutation({
    mutationFn: () => updateTimerAction({ practiceId, time }),
    onSuccess: () => console.log('Sussfully Updated Time'),
    onError: () => console.log('Error in updating time'),
  });
};
