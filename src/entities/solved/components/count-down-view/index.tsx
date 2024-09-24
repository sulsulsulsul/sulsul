'use client';

import { useIntervalValue } from '../../hooks/use-interval-value';

export const CountDownView = ({
  endTime,
  refetch,
}: {
  endTime: string;
  refetch: () => void;
}) => {
  const now = new Date();
  const end = new Date(endTime);
  const timeDiff = () => end.getTime() - now.getTime();

  const remain = useIntervalValue(() => timeDiff(), 1000, refetch);
  const seconds = Math.floor((Number(remain) / 1000) % 60);
  const minutes = Math.floor((Number(remain) / 1000 / 60) % 60);
  const hours = Math.floor((Number(remain) / (1000 * 60 * 60)) % 24);
  const days = Math.floor(Number(remain) / (1000 * 60 * 60 * 24));
  return (
    <div className="text-sm font-medium text-gray-500">
      {days}일 {hours}:{minutes}:{seconds}후 종료
    </div>
  );
};
