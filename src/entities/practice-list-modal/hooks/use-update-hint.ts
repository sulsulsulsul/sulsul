import { useMutation } from '@tanstack/react-query';

import { updateHintAction } from '../actions';

export const useUpdateHint = (practiceId: number) => {
  return useMutation({
    mutationFn: () => updateHintAction(practiceId),
    onSuccess: () => console.log('Successfully updated hint'),
    onError: () => console.log('Error in creating practice'),
  });
};
