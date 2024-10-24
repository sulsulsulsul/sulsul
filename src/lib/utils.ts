// TODO: lib 폴더를 shared로 옮기는게 어떨지??

import { type ClassValue, clsx } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/../tailwind.config';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

dayjs.extend(isoWeek);

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

  return session?.user.auth.accessToken;
};

export const assertAccessToken = async () => {
  const token = await getAccessToken();

  return token;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const removeNewlines = (str: string) => {
  return str.replace(/\\n/g, ' ');
};

export const applyNewLines = (str: string) => {
  return str.split('\\n');
};

export const getRecentWeeks = (currentDate: Dayjs) => {
  const weeks = [];
  let date = currentDate;

  for (let i = 0; i < 4; i++) {
    const weekStart = date.startOf('isoWeek').format('YYYY-MM-DD');
    const weekEnd = date.endOf('isoWeek').format('YYYY-MM-DD');

    const weekOfMonth = Math.ceil(date.date() / 7);

    const label = `${date.format('M')}월 ${weekOfMonth}째 주`;

    weeks.push({
      label,
      start: weekStart,
      end: weekEnd,
    });

    date = date.subtract(1, 'week');
  }

  return weeks;
};
