'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/entities/users/hooks'
import { cn } from '@/lib/utils'

import { AvatarSuri } from '../../components/avatar'
import { ListDialog } from '../../components/list-dialog'
import { DialogListProp, OnBoardProp } from '../../types/onboard'

export const OnboardModal = () => {
  const { user } = useCurrentUser()
  const nickname = user.nickname
  const [buttonDisable, setButtonDisable] = useState<boolean>(true)
  const [step, setStep] = useState<number>(0)
  const [dialogNumber, setDialogNumber] = useState<number>(0)
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('visible')
  const descriptionText = buttonDisable ? 'text-[#888CA0]' : 'text-[#576DFC]'
  let timer = () => {
    const timerId = setInterval(() => {
      setStep((prev) => (prev += 1))
    }, 1000)
    setTimeout(() => {
      clearInterval(timerId)
      setButtonDisable(false)
    }, 1000 * dialog[dialogNumber].messageListProp.length)
  }
  useEffect(() => {
    timer()
  }, [dialogNumber])

  const dialog: OnBoardProp[] = [
    {
      messageListProp: [
        {
          dialogListContent: [
            [
              {
                message: nickname as string,
                className: 'font-bold',
              },
              {
                message: '님, 만나서 반가워요',
                className: 'font-normal',
              },
            ],
          ],
          id: 'greeting',
          hidden: false,
          iconMessage: '/images/hand-wave.svg',
          firstDialog: true,
        },
        {
          dialogListContent: [
            [
              {
                message: '저는 ',
                className: 'font-normal',
              },
              {
                message: '인공지능 수리',
                className: 'font-bold',
              },
              {
                message: '라고 해요!',
                className: 'font-normal',
              },
            ],
          ],
          id: 'gretting',
          hidden: false,
        },
      ],
      buttonText: '그렇구나, 만나서 반가워!',
    },
    {
      messageListProp: [
        {
          dialogListContent: [
            [
              {
                message: '을 통해서',
                className: 'font-normal',
              },
            ],
          ],
          id: 'explaination',
          iconMessage: '/images/sul-logo.png',
          hidden: false,
          firstDialog: true,
        },
        {
          dialogListContent: [
            [
              {
                message: '내 자기소개를 기반으로 예측한 ',
                className: 'font-normal',
              },
            ],
            [
              {
                message: '면접 예상질문을 대비',
                className: 'font-bold',
              },
              {
                message: '할 수 있어요.',
                className: 'font-normal',
              },
            ],
            [
              {
                message: '스스로 ',
                className: 'font-normal',
              },
              {
                message: '말해보는 연습 ',
                className: 'font-bold',
              },
              {
                message: '해요',
                className: 'font-normal',
              },
            ],
            [
              {
                message: '최다빈출 ',
                className: 'font-normal',
              },
              {
                message: '면접 기출문제를 풀어요',
                className: 'font-bold',
              },
            ],
          ],
          id: 'list',
        },
        {
          dialogListContent: [
            [
              {
                message: '그럼 바로 시작해 볼까요?',
                className: 'font-normal',
              },
            ],
          ],
          id: 'content',
        },
      ],
      buttonText: '좋아! 시작해 볼까',
    },
  ]

  const initialize = () => {
    setButtonDisable(true)
    setDialogNumber(1)
    setStep(0)
  }

  return (
    <div
      className={cn(
        'fixed flex justify-center items-center w-screen z-20 h-screen bg-[#2B2D35]',
        visibility,
      )}
    >
      <div className="left-[40rem] z-30 flex h-[38rem] w-[32rem] flex-col items-center justify-between rounded-md bg-white  px-[46px] py-[42px]">
        <div className="flex flex-col gap-3 self-start">
          <AvatarSuri></AvatarSuri>
          {dialog &&
            dialog[dialogNumber].messageListProp &&
            dialog[dialogNumber].messageListProp.map(
              (value: DialogListProp, index) => {
                return (
                  <ListDialog
                    firstDialog={value.firstDialog}
                    key={index}
                    dialogListContent={value.dialogListContent}
                    id={value.id}
                    iconMessage={value.iconMessage}
                    hidden={index == 0 || index <= step ? false : true}
                  ></ListDialog>
                )
              },
            )}
        </div>
        <div
          className={`flex flex-col  gap-2  text-[14px]  ${descriptionText}`}
        >
          * 작성내용과 데이터는 외부에 공유되지 않으니 안심하세요.
          <Button
            size={'default'}
            variant={'default'}
            disabled={buttonDisable}
            onClick={() => {
              dialogNumber == 0 ? initialize() : setVisibility('hidden')
            }}
          >
            {dialog[dialogNumber].buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}