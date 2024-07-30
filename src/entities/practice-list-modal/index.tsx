'use client'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup'
import { Switch } from '@/components/ui/swtich'

import ModalHeader from './components/modal-header'
import MyResumeSelection from './components/my-resume-selection'

export default function PracticeList() {
  return (
    <div className="border-solid-grey-100 flex w-[75rem] flex-col rounded-md border">
      <ModalHeader />
      <section className="flex flex-row">
        <div className="flex w-1/2 flex-col">
          <MyResumeSelection />
          <MyResumeSelection />
          <MyResumeSelection />
          <MyResumeSelection />
        </div>
        <div className="flex w-1/2 flex-col">
          <MyResumeSelection />
          <MyResumeSelection />
          <MyResumeSelection />
          <MyResumeSelection />
        </div>
      </section>
      <section className="flex h-[98px] flex-row">
        <div className="border-solid-grey-100 flex w-1/2 flex-col justify-center border pl-[32px]">
          문제 순서
          <RadioGroup defaultValue="ordered" className="flex flex-row">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ordered" id="option-one" />
              <div>내 자기소개순서 단위별</div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="random" id="option-two" />
              <div>랜덤으로</div>
            </div>
          </RadioGroup>
        </div>
        <div className="border-solid-grey-100 flex w-1/2 flex-row items-center border pl-[24px]">
          <div className="flex flex-col">
            <span>타이머</span>
            <span>회면의 오른쪽 맨 위에서 타이머를 사용할수있어요.</span>
          </div>
          <Switch className="justify-end" onCheckedChange={() => {}} />
        </div>
      </section>
      <section className="mb-[20px] mr-[36px] mt-[16px] flex flex-row gap-2 self-end">
        <Button size={'default'} variant={'ghost'}>
          취소
        </Button>
        <Button>문항연습 시작</Button>
      </section>
    </div>
  )
}
