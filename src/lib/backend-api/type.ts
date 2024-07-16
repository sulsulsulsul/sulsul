export interface Response<T> {
  code: number
  message: string
  data: T
}

export type OAuthType = 'GOOGLE' | 'KAKAO'

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
