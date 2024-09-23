// TODO: lib 폴더를 shared로 옮기는게 어떨지??

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/../tailwind.config';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tailwindTheme = resolveConfig(tailwindConfig).theme;

export const assertValue = <T>(value: T | undefined, message: string): T => {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

export const getAccessToken = async () => {
  const session = await auth();
  //console.log('sessiontoken', session);
  return session?.user.auth.accessToken;
};

export const assertAccessToken = async () => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Access token is not defined');
  }
  return token;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const removeNewlines = (str: string) => {
  return str.replace(/\\n/g, ' ');
};
