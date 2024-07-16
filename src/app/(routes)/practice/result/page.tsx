import { ResultCard } from '@/components/cards/result-card'
import { ConfettiAnimation } from '@/components/lotties/confetti-animation'
import { SmileAnimation } from '@/components/lotties/smile-animation'
import { ThinkingAnimation } from '@/components/lotties/thinking-animation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Page = async () => {
  return (
    <main className="relative">
      <div className="absolute left-0 top-0 z-0 h-[497px] w-screen bg-blue-500 "></div>
      <ConfettiAnimation
        loop={1}
        className="absolute left-1/2 -translate-x-1/2"
      />
      <div className="relative">
        <div className="flex flex-col items-center justify-center">
          <Badge variant="result">답변이 술술</Badge>
          <h2 className="mt-3 text-center text-5xl font-bold text-white">
            이번 면접, 거뜬해요!
          </h2>
          <Image
            className="mt-[37px]"
            src={'/images/character-happy.svg'}
            alt="happy character"
            width={164}
            height={164}
          />
          <div className="mt-[47px] flex w-full items-center gap-4">
            <ResultCard
              title="술술 말한 면접질문"
              result={32}
              icon={<SmileAnimation loop={false} className="w-8" />}
            />
            <ResultCard
              title="답변 못한 면접 질문"
              result={16}
              icon={<ThinkingAnimation loop={false} className="w-8" />}
            />

            <ResultCard
              title="총 연습시간"
              result="24:39"
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
              <Button className="w-full">전체 다시하기</Button>
              <Button className="w-full">답변 못한 질문만 다시하기</Button>
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
  )
}

export default Page
