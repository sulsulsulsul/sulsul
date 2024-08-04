'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { LottieRefCurrentProps } from 'lottie-react'
import { set } from 'zod'

import { SmileAnimation } from '@/components/lotties/smile-animation'
import { ThinkingAnimation } from '@/components/lotties/thinking-animation'
import { createPracticeAction } from '@/entities/practice-list-modal/actions/create-practice'
import Timer from '@/entities/practice-list-modal/components/timer/timer'
import { ArchiveQuestionItem } from '@/entities/types'
import { cn } from '@/lib/utils'
import { usePracticeResultStore, usePracticeStore } from '@/store/practiceStore'

import { AnswerButton } from './answer-button'
import { AskCard } from './ask-card'
import { HintCard } from './hint-card'

// export interface Question {
//   id: string
//   content: string
// }
// const initialQuestions = [
//   {
//     id: 'question-1',
//     content: `MVP 테스트를 진행하는 과정에서 어려웠던 점은 무엇이었나요?`,
//   },
//   {
//     id: 'question-2',
//     content: `서울교통공사와 협력하여 솔루션을 승인받는 과정에서
//         어떤 어려움을 겪었고, 그것을 해결하기 위해 어떤 전략을
//         사용했는지 설명해주세요.`,
//   },
//   {
//     id: 'question-3',
//     content: `질문 3`,
//   },
//   {
//     id: 'question-4',
//     content: `질문 4`,
//   },
//   {
//     id: 'question-5',
//     content: `질문 5`,
//   },
//   {
//     id: 'question-6',
//     content: `질문 6`,
//   },
//   {
//     id: 'question-7',
//     content: `질문 7`,
//   },
//   {
//     id: 'question-8',
//     content: `질문 8`,
//   },
//   {
//     id: 'question-9',
//     content: `질문 9`,
//   },
//   {
//     id: 'question-10',
//     content: `질문 10`,
//   },
// ] as Question[]

const Page = () => {
  //GET
  const { timer, practiceList } = usePracticeStore()
  //SEND
  const { setResult, correct, incorrect } = usePracticeResultStore()

  const smileRef = useRef<LottieRefCurrentProps>(null)
  const thinkingRef = useRef<LottieRefCurrentProps>(null)

  //Question States
  const [questions, setQuestions] =
    useState<ArchiveQuestionItem[]>(practiceList)
  const [correctQuestions, setCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([])
  const [inCorrectQuestions, setInCorrectQuestions] = useState<
    ArchiveQuestionItem[]
  >([])

  //Hint
  const [showHint, setShowHint] = useState(false)

  //Set First Question
  const [q, setQ] = useState(practiceList[0])

  //Timer
  const [time, setTime] = useState('')
  const [pauseTimer, setPauseTimer] = useState(false)

  const router = useRouter()

  const handleCorrect = () => {
    if (questions.length === 0) return
    const questionToMarkCorrect = questions[0]
    setCorrectQuestions((prev) => [...prev, questionToMarkCorrect])
    setQuestions((prev) => prev.filter((_, i) => i !== 0))
    smileRef.current?.stop()
    smileRef.current?.play()
  }

  const handleInCorrect = () => {
    if (questions.length === 0) return
    setInCorrectQuestions((prev) => [...prev, questions[0]])
    setQuestions((prev) => prev.filter((_, i) => i !== 0))
    thinkingRef.current?.stop()
    thinkingRef.current?.play()
  }

  useEffect(() => {
    setShowHint(false)
    setQ(questions[0])
    if (questions.length === 0) {
      setPauseTimer(true)
      setResult!({
        time: time,
        correct: correctQuestions,
        incorrect: inCorrectQuestions,
      })
      const createPractice = async () => {
        await createPracticeAction(
          practiceList.map((value) => {
            return value.questionId
          }),
        ).then((res) => console.log(res))
      }
      createPractice()
      router.push('/practice/result')
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
