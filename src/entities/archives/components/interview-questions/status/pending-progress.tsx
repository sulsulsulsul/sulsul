import { useEffect, useRef, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const progressText = [
  '자소서 분석 중',
  '직무 정보 매핑 중',
  '예상 질문 생성 중',
  '예측 완료',
];

interface PendingInterviewQuestionProps {
  isPending: boolean;
  status: 'PENDING' | 'COMPLETE' | 'FAIL';
}

export function PendingProgress({
  isPending,
  status,
}: PendingInterviewQuestionProps) {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [activeStage, setActiveStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([
    false,
    false,
    false,
    false,
  ]);
  const lastStageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];

    const stageDurations = [2000, 2500, 3000];

    const updateProgress = (index: number) => {
      const startTime = Date.now();
      const duration = stageDurations[index];
      setActiveStage(index);

      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);

        setProgress((prev) => {
          const newState = [...prev];
          newState[index] = newProgress;
          return newState;
        });

        if (elapsedTime < duration) {
          timeoutIds.push(setTimeout(animate, 16));
        } else {
          setCompletedStages((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
          if (index < 2) {
            updateProgress(index + 1);
          } else if (index === 2) {
            setActiveStage(3);
            updateLastStage();
          }
        }
      };

      animate();
    };

    const updateLastStage = () => {
      if (lastStageIntervalRef.current) {
        clearInterval(lastStageIntervalRef.current);
      }

      const startTime = Date.now();
      const duration = 4500;

      const animateLastStage = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 85, 85);

        setProgress((prev) => {
          const newState = [...prev];
          newState[3] = newProgress;
          return newState;
        });

        if (newProgress < 90) {
          requestAnimationFrame(animateLastStage);
        }
      };

      requestAnimationFrame(animateLastStage);
    };

    const completeLastStage = () => {
      if (lastStageIntervalRef.current) {
        clearInterval(lastStageIntervalRef.current);
      }

      const startValue = progress[3];
      const startTime = Date.now();
      const duration = 1000;

      const animateCompletion = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min(
          startValue + (elapsedTime / duration) * (100 - startValue),
          100,
        );

        setProgress((prev) => {
          const newState = [...prev];
          newState[3] = newProgress;
          return newState;
        });

        if (newProgress < 100) {
          requestAnimationFrame(animateCompletion);
        } else {
          setCompletedStages((prev) => {
            const newState = [...prev];
            newState[3] = true;
            return newState;
          });
        }
      };

      requestAnimationFrame(animateCompletion);
    };

    const startProgress = () => {
      setProgress([0, 0, 0, 0]);
      setCompletedStages([false, false, false, false]);
      setActiveStage(0);
      updateProgress(0);
    };

    if (isPending) {
      if (status === 'PENDING') {
        startProgress();
      } else if (status === 'COMPLETE') {
        completeLastStage();
      } else if (status === 'FAIL') {
        setProgress((prev) => [prev[0], prev[1], prev[2], 0]);
        setCompletedStages([true, true, true, false]);
        setActiveStage(3);
        if (lastStageIntervalRef.current) {
          clearInterval(lastStageIntervalRef.current);
        }
      }
    }

    return () => {
      timeoutIds.forEach(clearTimeout);
      if (lastStageIntervalRef.current) {
        clearInterval(lastStageIntervalRef.current);
      }
    };
  }, [isPending, status]);

  return (
    <div className="relative">
      <div className="rounded-md border border-gray-200 px-[35px] py-[27px] shadow-base">
        <div className="flex items-center">
          {progress.map((value, index) => (
            <div
              key={index}
              className={cn('flex items-center', {
                'opacity-60': index !== activeStage,
                'opacity-100': index === activeStage,
              })}
            >
              <div className="relative size-6">
                <svg className="size-6" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill={completedStages[index] ? '#576DFC' : 'none'}
                    stroke="#E6E6EF"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill={completedStages[index] ? '#576DFC' : 'none'}
                    stroke="#576DFC"
                    strokeWidth="3"
                    strokeDasharray={`${value}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {completedStages[index] ? (
                    <svg
                      className="h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold text-blue-500">{`${index + 1}`}</span>
                  )}
                </div>
              </div>
              <span
                className={cn(
                  'text-base font-semibold text-gray-800 pl-1.5 text-nowrap',
                )}
              >
                {progressText[index]}
              </span>
              {index < 3 && (
                <div
                  className={cn('h-0.5 w-9 mx-2', {
                    'bg-blue-500': completedStages[index],
                    'bg-gray-300': !completedStages[index],
                  })}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="mb-3 h-[70px] w-full bg-gray-100" />
          ))}
      </div>
    </div>
  );
}
