'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface PracticingProps extends HTMLAttributes<HTMLDivElement> {}
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LottieRefCurrentProps } from 'lottie-react';
import { ChevronDown } from 'lucide-react';

import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import Timer from '@/entities/practice/practice-modal/components/timer/timer';
import { useUpdatePractice } from '@/entities/practice/practice-modal/hooks';
import { useUpdateTime } from '@/entities/practice/practicing/hooks';
import { useCreatePracticeQuestion } from '@/entities/practice/practicing/hooks/use-create-practice-question';
import { PracticingListType } from '@/entities/types/question';
import { useUserStore } from '@/store/client';
import {
  usePracticeResultStore,
  usePracticeStore,
} from '@/store/practiceStore';

import { AnswerButton } from './components/answer-button';
import { AskCard } from './components/ask-card';
import { HintCard } from './components/hint-card';

/**
 * https://www.figma.com/design/300FZcKnRKJSVsVLdTxQeN/%F0%9F%92%AC-Sulsul_team?m=dev&node-id=4382-15211&t=0Khe7bR
nJz7tpOBv-1
*/
export const Practicing = ({ className, ...props }: PracticingProps) => {
  const { timer, practiceList, practiceId } = usePracticeStore();
  const { setResult, correct, incorrect } = usePracticeResultStore();
  const { firstPractice } = useUserStore((state) => ({
    firstPractice: state.data.firstPractice,
  }));

  const isMobile =
    typeof window !== 'undefined'
      ? window.innerWidth >= 375 && window.innerWidth <= 767
      : false;

  //FIXME
  // const [coachModal, setCoachModal] = useState(!isMobile && firstPractice);
  const [coachModal, setCoachModal] = useState(false);

  const smileRef = useRef<LottieRefCurrentProps>(null);
  const thinkingRef = useRef<LottieRefCurrentProps>(null);

  const [questions, setQuestions] =
    useState<PracticingListType[]>(practiceList);

  const [correctQuestions, setCorrectQuestions] = useState<
    PracticingListType[]
  >([]);
  const [inCorrectQuestions, setInCorrectQuestions] = useState<
    PracticingListType[]
  >([]);

  const [showHint, setShowHint] = useState(false);

  const [q, setQ] = useState(practiceList[0]);

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(false);

  const router = useRouter();

  const mutationPractice = useUpdatePractice();
  const mutationTime = useUpdateTime();
  const questionToMarkCorrect = questions[0];

  const { mutate } = useCreatePracticeQuestion();

  const handleCorrect = () => {
    if (questions.length === 0) return;
    mutationPractice.mutate({
      questionId: q.questionId,
      practiceStatus: 'ANSWER',
    });
    mutate({ questionId: q.questionId, practiceTimeSec: time - startTime });
    setCorrectQuestions((prev) => [...prev, questionToMarkCorrect]);
    setQuestions((prev) => prev.filter((_, i) => i !== 0));
    setStartTime(time);
    smileRef.current?.stop();
    smileRef.current?.play();
  };

  const handleInCorrect = () => {
    if (questions.length === 0) return;
    mutationPractice.mutate({
      questionId: q.questionId,
      practiceStatus: 'NOT_ANSWER',
    });
    mutate({ questionId: q.questionId, practiceTimeSec: time - startTime });
    setInCorrectQuestions((prev) => [...prev, questions[0]]);
    setQuestions((prev) => prev.filter((_, i) => i !== 0));
    setStartTime(time);
    thinkingRef.current?.stop();
    thinkingRef.current?.play();
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    setShowHint(false);
    setQ(questions[0]);
    if (questions.length === 0) {
      setPauseTimer(true);
      setResult!({
        time: time,
        correct: correctQuestions,
        incorrect: inCorrectQuestions,
      });
      mutationTime.mutate({ practiceId, time: time });
      router.push('/practice/result');
    }
  }, [questions, router]);

  const handleCoachMark = () => {
    setCoachModal(false);
  };

  return (
    <div className={cn(className, 'relative w-full mobile:px-4')} {...props}>
      {coachModal && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen  pt-[60px] mobile:hidden">
          <div className="relative z-20 size-full">
            <Image src="/images/coachMark1.png" alt={''} fill />
          </div>
          <button
            className="absolute left-[300px] top-[100px] z-40 flex flex-row gap-1 p-4 text-white"
            onClick={handleCoachMark}
          >
            <Image
              src="/images/icons/check-box.svg"
              alt={''}
              width={24}
              height={24}
              className="p-0.5"
            />
            다시 보지않기
          </button>
        </div>
      )}
      <div
        className={cn(
          'absolute flex -top-[62px] right-0 mobile:right-4 justify-end',
          timer ? 'visible' : 'invisible',
        )}
      >
        <Timer
          pauseTimer={pauseTimer}
          className="relative z-20 m-2 mobile:m-0"
        />
      </div>

      {questions.length === 0 && (
        <div className="relative mt-[86px] h-[458px] w-[792px]  min-w-[343px] mobile:mt-[66px] mobile:h-[390px] mobile:w-[21.5rem]"></div>
      )}
      {questions.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            key={q.questionId}
            layoutId={q.questionId.toString()}
            className={cn(
              'relative mx-auto z-10 mt-[54px] h-[458px] w-[792px] mobile:w-full mobile:h-[390px] mobile:mt-[66px]',
            )}
          >
            <AskCard
              className={cn(
                'relative z-10 transition-[height] h-[458px] w-[792px] mobile:w-full mobile:h-[390px]',
                {
                  'h-[253px] mobile:h-[194px]': showHint,
                },
              )}
              question={q.data}
              remainingQuestions={questions.length}
            />
            <div className="absolute left-1/2 top-[200px] h-[308px] w-[90%] -translate-x-1/2 rounded-md border border-solid border-gray-200 bg-white shadow-base mobile:top-[182px] mobile:h-[252px]">
              <HintCard
                keywords={q.data.keywords}
                answerHint={q.data.answer}
                hintShown={q.data.isHint}
                questionId={q.questionId}
                showHint={showHint}
                setShowHint={setShowHint}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="relative z-10 mt-[108px] flex gap-6 mobile:mt-[80px] mobile:h-[80px] mobile:gap-2.5">
        <AnswerButton
          onMouseEnter={() => {
            smileRef.current?.stop();
            smileRef.current?.play();
          }}
          questions={correctQuestions}
          handleCorrect={handleCorrect}
        >
          <SmileAnimation
            loop={false}
            lottieRef={smileRef}
            className="w-[60px] mobile:w-[32px]"
          />
        </AnswerButton>
        <AnswerButton
          onMouseEnter={() => {
            thinkingRef.current?.stop();
            thinkingRef.current?.play();
          }}
          questions={inCorrectQuestions}
          handleCorrect={handleInCorrect}
        >
          <ThinkingAnimation
            lottieRef={thinkingRef}
            loop={false}
            className="w-[60px] mobile:w-[32px]"
          />
        </AnswerButton>
      </div>
    </div>
  );
};

export default Practicing;
