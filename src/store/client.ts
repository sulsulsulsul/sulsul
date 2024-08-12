import { create } from 'zustand';

interface PendingState {
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

export const usePendingStore = create<PendingState>((set) => ({
  isPending: false,
  setIsPending: (pending) => set({ isPending: pending }),
}));

interface Job {
  jobId: number;
  name: string;
}

interface AuthState {
  userId: number;
  token: string;
}

interface DataState {
  email: string;
  job: Job;
  nickname: string;
  userId: number;
  firstLogin: boolean;
  firstPractice: boolean;
}

interface UserState {
  auth: AuthState;
  data: DataState;
  image: string;
  setUserInfo: (userInfo: Partial<UserState>) => void;
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
    firstLogin: false,
    firstPractice: false,
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
}));
