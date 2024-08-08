import { useMutation } from '@tanstack/react-query'

import { updateUserJob, UpdateUserJobParams } from '../actions/update-user-job'

export const useUpdateJob = () => {
  return useMutation({
    mutationFn: (params: UpdateUserJobParams) => {
      return updateUserJob(params)
    },
  })
}
