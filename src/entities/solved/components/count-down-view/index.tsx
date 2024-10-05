'use client';

import { useEffect } from 'react';

import { useIntervalValue } from '../../hooks/use-interval-value';

export const CountDownView = ({
  endTime,
  refetch,
}: {
  endTime: string;
  refetch?: () => void;
}) => {
  const now = new Date();
  const end = new Date(endTime);
  const timeDiff = () => end.getTime() - now.getTime();

  const remain = useIntervalValue(() => timeDiff(), 1000, refetch);
  const seconds = String(Math.floor((Number(remain) / 1000) % 60)).padStart(
    2,
    '0',
  );
  const minutes = String(
    Math.floor((Number(remain) / 1000 / 60) % 60),
  ).padStart(2, '0');
  const hours = String(
    Math.floor((Number(remain) / (1000 * 60 * 60)) % 24),
  ).padStart(2, '0');
  const days = Math.floor(Number(remain) / (1000 * 60 * 60 * 24));

  return (
    <div className="mt-1 flex text-sm font-medium text-gray-500">
      <p className="w-[85px]">
        {days}일 {hours}:{minutes}:{seconds}
      </p>
      <p>후 종료</p>
    </div>
  );
};
