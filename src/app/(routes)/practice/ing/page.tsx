'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LottieRefCurrentProps } from 'lottie-react'
import { set } from 'zod'

import { SmileAnimation } from '@/components/lotties/smile-animation'
import { ThinkingAnimation } from '@/components/lotties/thinking-animation'
import Timer from '@/entities/practice-list-modal/components/timer/timer'
import { useUpdatePractice } from '@/entities/practice-list-modal/hooks'
import { ArchiveQuestionItem } from '@/entities/types'
import { cn } from '@/lib/utils'
import { usePracticeResultStore, usePracticeStore } from '@/store/practiceStore'

import { AnswerButton } from './answer-button'
import { AskCard } from './ask-card'
import { HintCard } from './hint-card'

const Page = () => {
  const { timer, practiceList } = usePracticeStore()

  const { setResult, correct, incorrect } = usePracticeResultStore()

  const smileRef = useRef<LottieRefCurrentProps>(null)
  const thinkingRef = useRef<LottieRefCurrentProps>(null)

  const [questions, setQuestions] =
    useState<ArchiveQuestionItem[]>(practiceList)
  const [correctQuestions, setCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([])
  const [inCorrectQuestions, setInCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([])

  const [showHint, setShowHint] = useState(false)

  const q = practiceList[0]

  const [time, setTime] = useState('')
  const [pauseTimer, setPauseTimer] = useState(false)

  const router = useRouter()

  const { mutate } = useUpdatePractice()

  //TODO: FIX practiceStatus
  const handleCorrect = () => {
    if (questions.length === 0) return
    mutate({
      questionId: q.questionId,
      practiceStatus: '',
    })
    const questionToMarkCorrect = questions[0]
    setCorrectQuestions((prev) => [...prev, questionToMarkCorrect])
    setQuestions((prev) => prev.filter((_, i) => i !== 0))
    smileRef.current?.stop()
    smileRef.current?.play()
  }

  //TODO: FIX practiceStatus
  const handleInCorrect = () => {
    if (questions.length === 0) return
    mutate({
      questionId: q.questionId,
      practiceStatus: '',
    })
    setInCorrectQuestions((prev) => [...prev, questions[0]])
    setQuestions((prev) => prev.filter((_, i) => i !== 0))
    thinkingRef.current?.stop()
    thinkingRef.current?.play()
  }

  useEffect(() => {
    setShowHint(false)
    if (questions.length === 0) {
      setPauseTimer(true)
      setResult!({
        time: time,
        correct: correctQuestions,
        incorrect: inCorrectQuestions,
      })
    }
  }, [questions, router])

  return (
    <main>
      <div className="absolute right-[360px] top-[84px]">
        {timer && <Timer setTime={setTime} pauseTimer={pauseTimer} />}
      </div>
      {questions.length == 0 && (
        <div className="relative mt-[86px] h-[468px] w-[792px]"></div>
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
            className="relative mx-auto mt-[86px] h-[468px] w-[792px]"
          >
            <AskCard
              className={cn('relative z-20 size-full transition-[height]', {
                'h-[253px]': showHint,
              })}
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
      <div className="relative z-10 mt-[108px] flex gap-6">
        <AnswerButton
          onMouseEnter={() => {
            smileRef.current?.stop()
            smileRef.current?.play()
          }}
          questions={correctQuestions}
          handleCorrect={handleCorrect}
        >
          <SmileAnimation loop={false} lottieRef={smileRef} className="w-10" />
        </AnswerButton>
        <AnswerButton
          onMouseEnter={() => {
            thinkingRef.current?.stop()
            thinkingRef.current?.play()
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
    </main>
  )
}

export default Page
