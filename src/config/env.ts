import { assertValue } from '@/lib/utils'

export const APP_ENV = {
  backendUrl: () => {
    return assertValue(process.env.BACKEND_URL, 'BACKEND_URL is not defined')
  },
}
