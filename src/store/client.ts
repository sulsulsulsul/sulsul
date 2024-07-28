import { create } from 'zustand'

interface Job {
  jobId: number
  name: string
}

interface AuthState {
  userId: number
  token: string
}

interface DataState {
  email: string
  job: Job
  nickname: string
  userId: number
}

interface UserState {
  auth: AuthState
  data: DataState
  image: string
  setUserInfo: (userInfo: Partial<UserState>) => void
}

export const useUserStore = create<UserState>((set) => ({
  auth: {
    userId: 0,
    token: '',
  },
  data: {
    email: '',
    job: {
      jobId: 0,
      name: '',
    },
    nickname: '',
    userId: 0,
  },
  image: '',
  setUserInfo: (userInfo) =>
    set((state) => ({
      auth: {
        ...state.auth,
        ...userInfo.auth,
      },
      data: {
        ...state.data,
        ...userInfo.data,
      },
      image: userInfo.image ?? state.image,
    })),
}))
