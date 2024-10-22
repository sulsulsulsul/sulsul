'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface PracticingProps extends HTMLAttributes<HTMLDivElement> {}
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LottieRefCurrentProps } from 'lottie-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [coachModal, setCoachModal] = useState(isMobile ? false : true);

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
    if (questions.length === 0 || coachModal) return;
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
    if (questions.length === 0 || coachModal) return;
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
    if (coachModal) return;
    let intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [coachModal]);

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
    <div
      className={cn(
        className,
        'relative w-full mobile:px-4 flex flex-col items-center',
      )}
      {...props}
    >
      <button
        className={cn(
          'hidden absolute left-0 z-40 flex flex-row gap-1 p-4 text-white',
          coachModal ? 'visible' : 'hidden',
        )}
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
      {coachModal && (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-gray-800/80"></div>
      )}
      <div
        className={cn(
          'absolute flex top-0 right-0 mobile:right-4 justify-end mt-[-4px]',
          coachModal ? 'visible' : timer ? 'visible' : 'invisible',
          coachModal && 'p-1 bg-white rounded-md -right-1 z-30',
        )}
      >
        <Timer
          coachModal={coachModal}
          pauseTimer={pauseTimer}
          className="relative z-20 m-2 mobile:m-0"
        />
        {coachModal && (
          <div className="absolute right-6 top-[70px]  flex flex-row gap-2">
            <div className="flex self-end overflow-visible text-2xl font-medium text-white">
              타이머
            </div>
            <Image
              className="mb-2 rotate-180"
              src="/images/icons/arrow-hint.svg"
              width={55}
              height={55}
              alt="arrow"
            />
          </div>
        )}
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
                coachModal={coachModal}
                setShowHint={setShowHint}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {coachModal && (
        <div className="relative z-30 mt-1 flex flex-row rounded-sm bg-white p-2 px-3 ">
          <div className="absolute top-[-45px] flex h-[55px] w-[500px] flex-row gap-2">
            <Image
              src="/images/icons/arrow-hint.svg"
              width={55}
              height={55}
              alt="arrow"
            />
            <div className="flex h-7 overflow-visible text-2xl font-medium text-white">
              내 답변 & 키워드 보기
            </div>
          </div>
          <span className="text-gray-500 mobile:text-sm">힌트</span>
          <ChevronUp className={cn('text-gray-400')} />
        </div>
      )}
      <div
        className={cn(
          'relative z-10 mt-[108px] flex jusitfy-self-center gap-6 mobile:mt-[80px] mobile:h-[80px] mobile:gap-2.5 w-full',
          coachModal && 'bg-white p-6 rounded-md mt-[84px] desktop:w-fit z-30',
        )}
      >
        {coachModal && (
          <div className="absolute top-[-104px] flex h-[104px] w-[240px] flex-row gap-2">
            <Image
              className="mt-5"
              src="/images/coach-mark-arrow3.svg"
              width={70}
              height={55}
              alt="arrow"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 text-2xl font-medium text-white">
                <Image
                  src="/images/icons/face-smile.svg"
                  width={32}
                  height={32}
                  alt="face-smile"
                />
                잘 답변했다면
              </div>
              <div className="flex flex-row gap-2 text-2xl font-medium text-white">
                <Image
                  src="/images/icons/face-thinking.svg"
                  width={32}
                  height={32}
                  alt="face-thinking"
                />
                헷갈린다면
              </div>
            </div>
          </div>
        )}
        <AnswerButton
          onMouseEnter={() => {
            if (coachModal) {
              return;
            }
            smileRef.current?.stop();
            smileRef.current?.play();
          }}
          questions={correctQuestions}
          handleCorrect={handleCorrect}
          className="desktop:w-[568px]"
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
          className="desktop:w-[568px]"
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
