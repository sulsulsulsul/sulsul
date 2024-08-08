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
import { set } from 'zod';

import { SmileAnimation } from '@/components/lotties/smile-animation';
import { ThinkingAnimation } from '@/components/lotties/thinking-animation';
import Timer from '@/entities/practice-list-modal/components/timer/timer';
import {
  useUpdatePractice,
  useUpdateTime,
} from '@/entities/practice-list-modal/hooks';
import { ArchiveQuestionItem } from '@/entities/types';
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
  // const { timer, practiceList, practiceId } = usePracticeStore();
  const { setResult, correct, incorrect } = usePracticeResultStore();
  //FIX GET rid of mock data
  const timer = true;
  const practiceId = 44;
  const practiceList: ArchiveQuestionItem[] = [
    {
      questionId: 198,
      content:
        'SK SUNNY 사회변화 챌린지 프로젝트에 참여하신 동기는 무엇이었나요?',
      answer: 'Answer Something',
      isAnswered: true,
      isHint: true,
      keywords: [],
    },
    {
      questionId: 199,
      content: "'슬기로운 화재대피' 팀에서 어떤 역할을 맡으셨나요?",
      answer: 'Answer Something',
      isAnswered: true,
      isHint: true,
      keywords: [],
    },
    {
      questionId: 200,
      content:
        '지하철 화재 대피요령을 개선하기 위해 어떤 문제를 해결하고자 했나요?',
      answer: '',
      isAnswered: false,
      isHint: true,
      keywords: [],
    },
    {
      questionId: 201,
      content:
        '솔루션 부착을 승인받기 어려웠던 서울교통공사를 어떻게 설득하셨나요?',
      answer: '',
      isAnswered: false,
      isHint: true,
      keywords: [],
    },
    {
      questionId: 202,
      content:
        '팀원들과 어떤 공동체 의식을 나누었고, 어떤 역량을 함양하셨나요?',
      answer: '',
      isAnswered: false,
      isHint: true,
      keywords: [],
    },
  ];

  const smileRef = useRef<LottieRefCurrentProps>(null);
  const thinkingRef = useRef<LottieRefCurrentProps>(null);

  const [questions, setQuestions] =
    useState<ArchiveQuestionItem[]>(practiceList);

  const [correctQuestions, setCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([]);
  const [inCorrectQuestions, setInCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([]);

  const [showHint, setShowHint] = useState(false);

  const [q, setQ] = useState(practiceList[0]);

  const [time, setTime] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(false);

  const router = useRouter();

  const mutationPractice = useUpdatePractice();
  const mutationTime = useUpdateTime();
  const questionToMarkCorrect = questions[0];

  const handleCorrect = () => {
    if (questions.length === 0) return;
    mutationPractice.mutate({
      questionId: q.questionId,
      practiceStatus: 'ANSWER',
    });
    setCorrectQuestions((prev) => [...prev, questionToMarkCorrect]);
    setQuestions((prev) => prev.filter((_, i) => i !== 0));
    smileRef.current?.stop();
    smileRef.current?.play();
  };

  const handleInCorrect = () => {
    if (questions.length === 0) return;
    mutationPractice.mutate({
      questionId: q.questionId,
      practiceStatus: 'NOT_ANSWER',
    });
    setInCorrectQuestions((prev) => [...prev, questions[0]]);
    setQuestions((prev) => prev.filter((_, i) => i !== 0));
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
  }, [questions, router]);

  const [coachModal, setCoachModal] = useState(true);

  return (
    <div className={cn(className)} {...props}>
      {coachModal && (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-gray-800/80"></div>
      )}
      {timer &&
        (coachModal ? (
          <div className={cn('flex justify-between  mt-1')}>
            <div className="flex items-center">
              <button
                className="absolute z-30 flex w-fit flex-row items-center gap-px p-[16px]"
                onClick={() =>
                  setCoachModal((prev) => {
                    return !prev;
                  })
                }
              >
                <Image
                  src="/images/icons/check-box.svg"
                  width={20}
                  height={20}
                  className="p-[2px]"
                  alt="icon"
                />
                <span className="text-lg font-semibold text-white">
                  다시 보지않기
                </span>
              </button>
            </div>
            <div className="flex flex-col">
              <div className=" z-[60] rounded-md bg-white">
                <Timer
                  setTime={setTime}
                  pauseTimer={pauseTimer}
                  className="relative z-20 m-2"
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
          <div className={cn('flex justify-end')}>
            <Timer
              setTime={setTime}
              pauseTimer={pauseTimer}
              className="relative z-20 "
            />
          </div>
        ))}
      {questions.length == 0 && (
        <div className="relative mt-[86px] h-[468px] w-[792px]  min-w-[343px] "></div>
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
              'relative mx-auto z-10   h-[29.25em] w-[49.5em]',
              coachModal ? 'mt-[0px]' : 'mt-[13px]',
            )}
          >
            <AskCard
              className={cn(
                'relative z-10  w-[49.5em] h-[29.25em] transition-[height]',
                {
                  'h-[253px]': showHint,
                },
              )}
              question={q}
              remainingQuestions={questions.length}
            />
            <div className="absolute left-1/2 top-[210px] h-[308px] w-[90%] -translate-x-1/2 rounded-md bg-white">
              <HintCard
                keywords={q.keywords}
                answerHint={q.answer}
                hintShown={q.isHint}
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
          <div className="sticky z-20  flex items-center justify-center gap-1">
            <div className="absolute bottom-[40px] ml-[200px] flex size-fit flex-row gap-x-1.5">
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
            <div className="m- absolute -top-[100px] left-6 z-30 flex size-fit flex-row gap-2">
              <Image
                className="mt-1"
                src="/images/icons/arrow-hint.svg"
                width={65}
                height={76}
                alt="icon"
              />
              <div className="flex size-fit flex-col gap-2">
                <div className="flex h-[32px] flex-row items-center justify-items-center">
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
                <div className="mb-20 flex h-[32px] flex-row items-center justify-items-center">
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
                  className="w-10"
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
                  className="w-10"
                />
              </AnswerButton>
            </div>
          </div>
        </>
      ) : (
        <div className="relative z-20 mt-[108px] flex gap-6">
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
              className="w-10"
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
              className="w-10"
            />
          </AnswerButton>
        </div>
      )}
    </div>
  );
};

export default Practicing;
