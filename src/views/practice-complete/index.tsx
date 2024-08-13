'use client';
import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface PracticeCompleteProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4382-15805&t=OZrGkP4ZgEF84mEl-1
 */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { ResultCard } from '@/components/cards/result-card';
import { ConfettiAnimation } from '@/components/lotties/confetti-animation';
import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  usePracticeResultStore,
  usePracticeStore,
} from '@/store/practiceStore';

export const PracticeComplete = ({
  className,
  ...props
}: PracticeCompleteProps) => {
  const { time, correct, incorrect } = usePracticeResultStore();
  const { timer, setStore, practiceId } = usePracticeStore();

  const totalCorrect = correct.length;
  const totalIncorrect = incorrect.length;
  const totalScore = totalCorrect / (totalCorrect + totalIncorrect);
  const router = useRouter();

  const handlePracticeAll = () => {
    router.push('/practice/ing');
  };
  const handlePracticeIncorrect = () => {
    setStore({
      timer: timer,
      practiceList: incorrect,
      practiceId: practiceId,
    }),
      router.push('/practice/ing');
  };

  const timeText =
    Math.floor(time / 60)
      .toString()
      .padStart(2, '0') +
    ' : ' +
    Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

  return (
    <main
      className={cn(
        className,
        'absolute top-[60px] left-0 w-screen justify-items-center',
      )}
      {...props}
    >
      <div className="absolute h-[497px] w-screen bg-blue-500" />
      <ConfettiAnimation
        loop={1}
        className="absolute left-1/2 -translate-x-1/2"
      />
      <div className="relative">
        <div className="flex flex-col items-center justify-center">
          <Badge variant="result" className="mt-[42px]">
            {totalScore >= 0.8 ? '답변이 술술' : '천 리 길도 한 걸음부터죠'}
          </Badge>
          <h2 className="mt-3 text-center text-5xl font-bold text-white">
            {totalScore >= 0.8
              ? '이번 면접, 거뜬해요!'
              : '연습이 조금 더 필요해요'}
          </h2>
          <Image
            className="mt-[37px]"
            src={
              totalScore >= 0.8
                ? '/images/character-happy.svg'
                : '/images/character-shocked.svg'
            }
            alt="happy character"
            width={164}
            height={164}
          />
          <div className="mt-[47px] flex w-full items-center justify-center gap-4">
            <ResultCard
              title="술술 말한 면접질문"
              result={totalCorrect}
              icon={<SmileAnimation loop={false} className="w-8" />}
            />
            <ResultCard
              title="답변 못한 면접 질문"
              result={totalIncorrect}
              icon={<ThinkingAnimation loop={false} className="w-8" />}
            />

            <ResultCard
              title="총 연습시간"
              result={timeText}
              icon={
                <Image
                  alt="clock icon"
                  width={32}
                  height={32}
                  src={'/images/icons/etc-clock.svg'}
                />
              }
            />
          </div>
          <div className="mt-14 flex items-center justify-center">
            <div className="flex w-[652px] items-center justify-center gap-2">
              <Button className="w-full" onClick={handlePracticeAll}>
                전체 다시하기
              </Button>
              {incorrect.length !== 0 && (
                <Button className="w-full" onClick={handlePracticeIncorrect}>
                  답변 못한 질문만 다시하기
                </Button>
              )}
            </div>
          </div>
          <Link
            href={'/practice'}
            className="mt-9 flex items-center gap-1 text-lg font-semibold"
          >
            <span className="text-gray-600">실전 연습 홈으로</span>
            <ChevronRight className="text-gray-500" />
          </Link>
        </div>
      </div>
    </main>
  );
};
