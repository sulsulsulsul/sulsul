import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { set } from 'zod';

import { cn } from '@/lib/utils';

interface TimerProp extends HTMLAttributes<HTMLDivElement> {
  pauseTimer: boolean;
  disableTime?: boolean;
}

export default function Timer({
  disableTime,
  pauseTimer,
  className,
  ...props
}: TimerProp) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let timeInterval = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleStart = useCallback(() => {
    if (isRunning || disableTime) return;
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }, [isRunning]);

  const handlePause = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(timeInterval.current!);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timeInterval.current!);
    setTimer(0);
  };

  const formatTime = (timer: number) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(timer % 60)
      .toString()
      .padStart(2, '0');
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(timer);

  useEffect(() => {
    pauseTimer && handlePause;
  }, [handlePause, pauseTimer, timer]);

  return (
    <div
      className={cn(
        'flex w-fit flex-row gap-1 rounded-xl bg-gray-800  px-3 py-[11px] mobile:px-2 mobile:py-2',
        className,
      )}
    >
      {isRunning ? (
        <button onClick={handlePause}>
          <Image
            src="/images/icons/icon-timer.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </button>
      ) : (
        <button onClick={handleStart}>
          <Image
            src="/images/icons/icon-play.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="w-[46px] text-lg font-medium text-white mobile:w-[40px] mobile:text-sm mobile:leading-6">
        {minutes + ':' + seconds}
      </div>
      <button onClick={handleReset}>
        <Image
          src="/images/icons/icon-redo-white.svg"
          alt="icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
