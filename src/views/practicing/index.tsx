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
  const [coachModal, setCoachModal] = useState(true);

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
    setShowHint(false);
    setQ(questions[0]);
    if (questions.length === 0) {
      setPauseTimer(true);
      setResult!({
        time: time,
        correct: correctQuestions,
        incorrect: inCorrectQuestions,
      });
      mutationTime.mutate({ practiceId, time });
      router.push('/practice/result');
    }
  }, [questions, router, isMobile]);

  const handleCoachMark = () => {
    setCoachModal(false);
  };

  return (
    <div className={cn(className, 'relative w-full mobile:px-4')} {...props}>
      {coachModal && (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-gray-800/80 mobile:hidden" />
      )}
      {coachModal ? (
        <div className=" absolute left-4 top-[-78px] flex w-full justify-between ">
          <div className="flex items-center">
            <button
              className="absolute z-30 flex w-fit flex-row items-center gap-px p-[16px]"
              onClick={handleCoachMark}
            >
              <Image
                src="/images/icons/check-box.svg"
                width={24}
                height={24}
                className="p-[2px]"
                alt="icon"
              />
              <span className="ml-1 text-lg font-semibold text-white">
                다시 보지않기
              </span>
            </button>
          </div>
          <div className={cn('flex flex-col', timer ? 'visible' : 'invisible')}>
            <div className="z-[60] flex h-[78px] w-[158px] items-center justify-center rounded-md bg-white">
              <Timer
                setTime={setTime}
                pauseTimer={pauseTimer}
                className="relative z-20 m-2"
                disableTime={true}
              />
            </div>
            <div className="sticky z-20 flex items-start justify-center">
              <div className="absolute flex size-fit flex-row gap-x-1.5">
                <span className="mt-[38px] font-semibold text-white">
                  타이머
                </span>
                <Image
                  src="/images/icons/arrow-hint.svg"
                  className="mb-[10px] mr-6 rotate-180 "
                  width={65}
                  height={76}
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'absolute flex -top-[62px] right-0 mobile:right-4 justify-end',
            timer ? 'visible' : 'invisible',
          )}
        >
          <Timer
            setTime={setTime}
            pauseTimer={pauseTimer}
            className="relative z-40 m-2 mobile:m-0"
          />
        </div>
      )}
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
      {coachModal ? (
        <>
          <div className="z-50 flex items-center justify-center gap-1">
            <div className="absolute bottom-[35px] ml-[200px] flex size-fit flex-row gap-x-1.5">
              <Image
                src="/images/icons/arrow-hint.svg"
                width={65}
                height={76}
                alt="icon"
              />
              <span className="mb-10 font-semibold text-white">
                내 답변 & 키워드 보기
              </span>
            </div>
            <div className="flex w-fit flex-row rounded-xl bg-white p-2">
              <span className="text-gray-500">힌트</span>
              <ChevronDown className="text-gray-400" />
            </div>
          </div>
          <div className="sticky z-20 mt-[68px] rounded-md bg-white p-4">
            <div className="absolute left-6 top-[-100px] z-30 flex size-fit flex-row gap-2">
              <Image
                src="/images/coach-mark-arrow3.svg"
                width={65}
                height={76}
                alt="icon"
              />
              <div className="flex size-fit flex-col gap-2">
                <div className="flex h-[32px] flex-row items-center justify-items-center gap-2">
                  <Image
                    src="/images/icons/face-smile.svg"
                    width={32}
                    height={32}
                    alt="icon"
                  />
                  <span className="text-lg font-semibold  text-white">
                    잘 답변했다면
                  </span>
                </div>
                <div className="mb-20 flex h-[32px] flex-row items-center justify-items-center gap-2">
                  <Image
                    src="/images/icons/face-thinking.svg"
                    width={32}
                    height={32}
                    alt="icon"
                  />
                  <span className="text-lg font-semibold text-white">
                    헷갈린다면
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-x-6 rounded-md">
              <AnswerButton
                questions={correctQuestions}
                handleCorrect={handleCorrect}
              >
                <SmileAnimation
                  loop={false}
                  lottieRef={smileRef}
                  className="w-[60px]"
                />
              </AnswerButton>
              <AnswerButton
                questions={inCorrectQuestions}
                handleCorrect={handleInCorrect}
              >
                <ThinkingAnimation
                  lottieRef={thinkingRef}
                  loop={false}
                  className="w-[60px]"
                />
              </AnswerButton>
            </div>
          </div>
        </>
      ) : (
        <div className="relative z-20 mt-[108px] flex gap-6 mobile:mt-[80px] mobile:h-[80px] mobile:gap-2.5">
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
      )}
    </div>
  );
};

export default Practicing;
