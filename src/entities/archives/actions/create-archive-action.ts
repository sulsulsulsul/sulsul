'use server'

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

export interface CreateArchiveActionRequest {
  title: string
  resume: string
  companyName: string
}

export const createArchiveAction = async (
  props: CreateArchiveActionRequest,
) => {
  return backendApi({
    endpoint: API_ENDPOINT.archive.createArchive(),
    data: {
      ...props,
    },
  })
}
