'use client'
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ResultCard } from '@/components/cards/result-card'
import { SmileAnimation } from '@/components/lotties/smile-animation'
import { ThinkingAnimation } from '@/components/lotties/thinking-animation'
import { Button } from '@/components/ui/button'
import PracticeSelection from '@/entities/practice-list-modal'
import { cn } from '@/lib/utils'
interface CurrentStatusProps extends HTMLAttributes<HTMLDivElement> {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const CurrentStatus = ({
  className,
  setModalOpen,
  ...props
}: CurrentStatusProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex gap-[25px]">
        <div className="flex h-[273px] min-w-[282px] flex-col items-center justify-between">
          <h2 className="text-4xl font-bold">
            <p>
              <span className="text-blue-500">수리수리</span>님,
            </p>
            <p>지피지기면 백전백승이에요!</p>
          </h2>
          <div>
            <Image
              className="animate-cheering-animation"
              src={'/images/character-cheering.svg'}
              alt="cheering character"
              width={162}
              height={145}
            />
          </div>
          <Button className="w-full" onClick={() => setModalOpen(true)}>
            실전연습하기
          </Button>
        </div>
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
    </div>
  )
}
