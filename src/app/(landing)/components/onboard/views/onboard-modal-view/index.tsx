'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';
import { useVideoStateStore } from '@/store/modal';

import { AvatarSuri } from '../../components/avatar';
import { ListDialog } from '../../components/list-dialog';
import { DialogListProp, OnBoardProp } from '../../types/onboard';

export const OnboardModal = () => {
  const { nickname, firstLogin } = useUserStore((state) => ({
    nickname: state.data.nickname,
    firstLogin: state.data.firstLogin,
  }));
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const [step, setStep] = useState<number>(0);

  const [dialogNumber, setDialogNumber] = useState<number>(0);

  const [hidden, setHidden] = useState(false);

  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('visible');

  const descriptionText = buttonDisable ? 'text-gray-500' : 'text-blue-500';

  //랜딩 페이지 비디오 멈추기
  const { pause, restart } = useVideoStateStore();

  const dialog: OnBoardProp[] = [
    {
      messageListProp: [
        {
          dialogContents: [
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
          iconMessage: '/images/hand-wave.svg',
          firstDialog: true,
        },
        {
          dialogContents: [
            [
              {
                message: '저는 ',
                className: 'font-normal',
              },
              {
                message: '면접준비를 돕는 ',
                className: 'font-normal',
              },
              {
                message: '인공지능 수리',
                className: 'font-bold',
              },
              {
                message: '에요!',
                className: 'font-normal',
              },
            ],
          ],
          id: 'gretting',
        },
      ],
      buttonText: '그렇구나, 만나서 반가워!',
    },
    {
      messageListProp: [
        {
          dialogContents: [
            [
              {
                message: ' 을 통해서',
                className: 'font-normal',
              },
            ],
          ],
          id: 'explaination',
          iconMessage: '/images/sul-logo.png',
          firstDialog: true,
        },
        {
          dialogContents: [
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
                message: '답변을 말해보는 연습',
                className: 'font-bold',
              },
              {
                message: '해요.',
                className: 'font-normal',
              },
            ],
            [
              {
                message: '최다빈출 ',
                className: 'font-normal',
              },
              {
                message: '면접 기출문제를 풀어요.',
                className: 'font-bold',
              },
            ],
          ],
          id: 'list',
        },
        {
          dialogContents: [
            [
              {
                message: '그럼 바로 시작해볼까요?',
                className: 'font-normal',
              },
            ],
          ],
          id: 'content',
        },
      ],
      buttonText: '좋아! 시작해볼래',
    },
  ];

  useEffect(() => {
    setHidden(false);
    visibility === 'visible' && pause();
    const timerId = setInterval(() => {
      if (step <= dialog[dialogNumber].messageListProp.length) {
        setStep((prev) => (prev += 1));
      }
    }, 800);
    setTimeout(() => {
      setButtonDisable(false);
      clearInterval(timerId);
    }, 800 * dialog[dialogNumber].messageListProp.length);
  }, [dialogNumber]);

  const initialize = () => {
    setHidden(true);
    setStep(0);
    setButtonDisable(true);
    setDialogNumber(1);
  };

  const handleClose = () => {
    restart();
    setVisibility('hidden');
  };

  return (
    !firstLogin && (
      <div
        className={cn(
          'fixed flex justify-center items-center w-screen z-[50] h-screen bg-gray-800/80',
          visibility,
        )}
      >
        <div className="left-[40rem] z-[60] flex h-[32.75rem] w-[27rem] flex-col items-center justify-between rounded-md bg-white  px-[46px] py-[42px]">
          <div className=" flex w-full flex-col self-start">
            <div className="mb-3 flex size-full justify-between">
              <AvatarSuri></AvatarSuri>
              <div className="my-2.5 text-2xl">
                <span className="text-gray-500">{`${dialogNumber + 1}`}</span>
                <span className="text-gray-300">/2</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {dialog &&
                dialog[dialogNumber].messageListProp &&
                dialog[dialogNumber].messageListProp.map(
                  (value: DialogListProp, index: number) => {
                    return (
                      <ListDialog
                        firstDialog={value.firstDialog}
                        key={index}
                        dialogContents={value.dialogContents}
                        id={value.id}
                        iconMessage={value.iconMessage}
                        visible={step >= index}
                        hidden={hidden}
                      />
                    );
                  },
                )}
            </div>
          </div>
          <div
            className={`mt-[37px] flex w-[340px] flex-col gap-2 ${descriptionText}`}
          >
            {dialogNumber === 1 && (
              <div className="mx-[11px] text-sm font-semibold tracking-tight">
                * 작성내용과 데이터는 외부에 공유되지 않으니 안심하세요.
              </div>
            )}
            <Button
              className="w-full text-lg font-bold"
              variant="default"
              disabled={buttonDisable}
              onClick={dialogNumber === 0 ? initialize : handleClose}
            >
              {dialog[dialogNumber].buttonText}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
