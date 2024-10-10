'use client';

import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { AuthSignedIn } from '@/components/auth/auth-signed-in';
import { AuthSignedOut } from '@/components/auth/auth-signed-out';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/swtich';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { PracticingListType } from '@/entities/types/question';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';
import { useOpenModalStore } from '@/store/modal';
import { usePracticeStore } from '@/store/practiceStore';

import { usePracticeDetail } from '../../hooks/use-get-practice-detail';
import { useAllPracticeList } from '../../practice-list/hook';
import {
  useCreatePractice,
  usePracticeQuestions,
  useResumes,
} from '../../practice-modal/hooks';

interface PracticeStartCardProps extends HTMLAttributes<HTMLDivElement> {
  nickname: string;
}

type QUESTCOLLECTION = {
  archiveId?: number;
  collection: number[];
  allQuestion: boolean;
  resumeTitle: string;
};

export const PracticeStartCard = ({
  className,
  nickname,

  ...props
}: PracticeStartCardProps) => {
  const [random, setRandom] = useState(false);
  const [timer, setTimer] = useState(false);

  const [openQuestion, setOpenQuestion] = useState(false);
  const [openResume, setOpenResume] = useState(true);
  const [selectedResume, setSelectedResume] = useState('');
  const [focusedResume, setFocusedResume] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [collection, setCollection] = useState<QUESTCOLLECTION[]>([]);
  const [openAdd, setOpenAdd] = useState(true);
  const { auth } = useUserStore();
  const { resume } = useResumes();
  const { questions } = usePracticeQuestions(focusedResume);

  const { list } = useAllPracticeList(auth.userId);
  const handleAllResume = () => {
    setCollection((prev) => [
      ...prev,
      {
        collection: list
          ? list?.contents.flatMap((item) => item.questionId)
          : [],
        allQuestion: true,
        resumeTitle: '내 자기소서 전체',
      },
    ]);
    setOpenQuestion(false), setOpenResume(false), setSelectedResume('');
    setSelectedQuestions([]);
    setOpenAdd(false);
  };

  const finalList = collection.flatMap((item) => item.collection);
  const shuffledList = (list: number[]) => {
    const newList = [...list];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  };

  const detailedQuestionsIds = random ? shuffledList(finalList) : finalList;
  const { data, refetch } = usePracticeDetail(detailedQuestionsIds);
  const router = useRouter();
  const { setStore } = usePracticeStore();
  const mutation = useCreatePractice();

  const handleSubmit = async () => {
    await refetch();
    await mutation.mutate(detailedQuestionsIds, {
      onSuccess: (value) => {
        router.push('/practice/ing'),
          setStore({
            timer: timer,
            practiceList: data as PracticingListType[],
            practiceId: value,
          });
      },
    });
  };

  const { setModalOpen } = useOpenModalStore();
  const questionCount = collection.flatMap((item) => item.collection).length;

  return (
    <div className={cn(className)} {...props}>
      <div className="flex w-full justify-start">
        <h2 className="text-4xl font-bold">
          <p>
            <span className="text-blue-500">{nickname}</span>님,
          </p>
          <p className="text-gray-900">지피지기면 백전백승이에요!</p>
        </h2>
      </div>
      <div className="mt-[5px] flex items-center justify-center mobile:mb-4 mobile:mt-5">
        <Image
          className="animate-cheering-animation"
          src={'/images/character-cheering.svg'}
          alt="cheering character"
          width={161}
          height={142}
        />
      </div>
      <AuthSignedIn>
        <Button
          className="w-full mobile:hidden"
          onClick={() => setModalOpen(true)}
        >
          실전연습하기
        </Button>
        <Drawer>
          <DrawerTrigger className="hidden h-12 w-full items-center justify-center rounded-[30px] bg-blue-500 text-base text-white mobile:flex">
            <div className="h-12 text-[15px] font-medium leading-[48px]">
              실전연습하기
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[620px]">
            <div className="flex h-full flex-col overflow-scroll">
              <DrawerHeader className="justify-start">
                <DrawerTitle className="font-semibold">
                  어떤 면접질문을 연습할까요?
                </DrawerTitle>
              </DrawerHeader>
              <div className="h-fit px-4">
                {openAdd ? (
                  <div>
                    <div className="relative">
                      <button
                        className={cn(
                          ' w-full flex justify-between p-[13px] border border-gray-200 h-[50px] rounded-xl mt-3',
                          openResume && 'rounded-b-none',
                          selectedResume != '' && !openResume && 'border-black',
                        )}
                        onClick={() => {
                          setOpenResume((prev) => !prev);
                        }}
                      >
                        {selectedResume === ''
                          ? '내 자기소개서'
                          : selectedResume}
                        {openResume ? (
                          <ChevronUp color="#B9BCCC" />
                        ) : (
                          <ChevronDown color="#B9BCCC" />
                        )}
                      </button>
                      {openResume && (
                        <div className="absolute left-0 top-[50px] z-[70] flex h-[400px] w-full flex-col overflow-scroll bg-white">
                          <div
                            className="flex h-[61px]  items-center border-[0.5px] border-gray-200 py-3 pl-4 text-sm font-normal"
                            onClick={handleAllResume}
                          >
                            내 자기소개서 전체
                          </div>
                          {resume ? (
                            resume?.map((value: any) => {
                              return (
                                <div
                                  key={value.archiveId}
                                  className="flex h-[79px] w-full flex-col justify-center gap-1 border-[0.5px] border-gray-200 py-3 pl-4 text-sm font-normal"
                                  onClick={() => {
                                    setFocusedResume(value.archiveId),
                                      setSelectedResume(value.title),
                                      setOpenResume(false),
                                      setOpenQuestion(true);
                                  }}
                                >
                                  {value.title}
                                  <span className="w-fit rounded-sm bg-gray-100 px-2 py-1.5 text-[11px] leading-[18px] text-gray-500">
                                    {value.companyName}
                                  </span>
                                </div>
                              );
                            })
                          ) : (
                            <span>loading...</span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      className={cn(
                        'w-full text-gray-400 flex justify-between p-[13px] border border-gray-200 h-[50px] rounded-xl mt-3',
                        openQuestion && 'rounded-b-none',
                      )}
                      onClick={() => {
                        setOpenQuestion((prev) => !prev);
                      }}
                    >
                      예상 면접질문{' '}
                      {openQuestion ? (
                        <ChevronUp color="#B9BCCC" />
                      ) : (
                        <ChevronDown color="#B9BCCC" />
                      )}
                    </button>
                    {openQuestion && (
                      <div className="h-[343px] w-full overflow-scroll bg-white ">
                        <div className="flex w-full flex-row items-center gap-1 border-[0.5px] border-gray-200 py-[13px] pl-4 align-middle text-sm">
                          <Checkbox
                            className="m-2.5 size-5"
                            onCheckedChange={(check) => {
                              check
                                ? questions &&
                                  setSelectedQuestions(
                                    questions?.questions.map(
                                      (item) => item.questionId,
                                    ),
                                  )
                                : setSelectedQuestions([]);
                            }}
                          />{' '}
                          예상 면접질문 전체
                        </div>
                        {questions &&
                          questions?.questions.map((value) => {
                            return (
                              <div
                                key={value.questionId}
                                className="flex h-fit flex-row items-center gap-1 border-[0.5px] border-gray-200 bg-white px-4 py-[13px] text-sm text-black "
                              >
                                <Checkbox
                                  className="m-2.5 size-5"
                                  checked={selectedQuestions.includes(
                                    value.questionId,
                                  )}
                                  onCheckedChange={(checked) => {
                                    checked
                                      ? setSelectedQuestions((prev) => [
                                          ...prev,
                                          value.questionId,
                                        ])
                                      : setSelectedQuestions((prev) =>
                                          prev.filter(
                                            (item) => item !== value.questionId,
                                          ),
                                        );
                                  }}
                                />
                                <div className="flex break-words">
                                  {value.content}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <button
                      className="h-[50px] w-full rounded-xl border border-gray-200 text-base font-medium"
                      onClick={() => {
                        setOpenQuestion(false),
                          setOpenResume(true),
                          setSelectedResume('');
                        setSelectedQuestions([]);
                        setOpenAdd(true);
                      }}
                    >
                      문항 추가하기
                    </button>
                    <div className="mt-3 flex flex-col gap-2.5 overflow-scroll ">
                      {collection.map((value: QUESTCOLLECTION, index) => {
                        return (
                          <div
                            key={`practiceCollection_${index}`}
                            className="flex h-[78px] w-full flex-col justify-center  rounded-2xl bg-gray-50 px-4 "
                          >
                            <div className="flex w-full flex-row justify-between text-sm  font-medium">
                              {value.resumeTitle}
                              <button
                                onClick={() =>
                                  setCollection((prev) =>
                                    prev.splice(index + 1, 1),
                                  )
                                }
                              >
                                <Image
                                  src="images/icons/icon-close-m.svg"
                                  alt="icon-close"
                                  width={24}
                                  height={24}
                                />
                              </button>
                            </div>
                            <div className="text-2xs font-medium text-blue-500">
                              {`${value.collection.length}문항`}{' '}
                              {value.allQuestion ? 'ㆍ예상 면접질문 전체' : ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <section
                className={cn(
                  'flex flex-col h-fit bg-white mt-3 mb-[84px]',
                  (openResume || openQuestion || openAdd) && 'hidden',
                )}
              >
                <Separator className="h-2.5 bg-gray-100 " />
                <div className="flex w-full flex-col border-b border-b-gray-100 px-4 py-6">
                  <div className="text-base font-semibold">문제 순서</div>
                  <div className="mt-2 flex w-full flex-row gap-[9px]">
                    <button
                      className={cn(
                        'w-1/2 h-[50px] rounded-xl border border-black text-base font-medium',
                        random
                          ? 'text-gray-400 border-gray-400'
                          : 'text-black border-black',
                      )}
                      onClick={() => setRandom(false)}
                    >
                      내 자기소개서 단위별로
                    </button>
                    <button
                      className={cn(
                        'w-1/2 h-[50px] rounded-xl border border-black text-base font-medium',
                        random
                          ? 'text-black border-black'
                          : 'text-gray-400 border-gray-400',
                      )}
                      onClick={() => setRandom(true)}
                    >
                      랜덤으로
                    </button>
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between border-b border-b-gray-100 py-6 pl-4">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">타이머</span>
                    <span className="mt-0.5 text-xs text-gray-600">
                      화면의 오른쪽 맨 위에서 타이머를 사용할 수 있어요.
                    </span>
                  </div>
                  <Switch
                    className="mr-4"
                    onCheckedChange={(check: CheckedState) => {
                      setTimer(!!check);
                    }}
                  />
                </div>
              </section>
            </div>
            <DrawerFooter className="fixed  bottom-0  z-[70] w-full border-t border-gray-200 bg-white">
              {openResume ? (
                <Button variant="outline" onClick={() => setOpenResume(false)}>
                  문항 선택 닫기
                </Button>
              ) : openQuestion ? (
                selectedQuestions.length !== 0 ? (
                  <Button
                    variant="default"
                    onClick={() => {
                      setCollection((prev) => [
                        ...prev,
                        {
                          archiveId: focusedResume,
                          collection: selectedQuestions,
                          allQuestion:
                            selectedQuestions.length ===
                            questions?.questions.length,
                          resumeTitle: selectedResume,
                        },
                      ]),
                        setOpenQuestion(false),
                        setOpenResume(false),
                        setSelectedResume('');
                      setSelectedQuestions([]);
                      setOpenAdd(false);
                    }}
                  >
                    <span className="mr-1 text-green-point">{`${selectedQuestions.length} `}</span>
                    문항 선택하기
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setOpenQuestion(false)}
                  >
                    문항 선택 닫기
                  </Button>
                )
              ) : collection.length === 0 ? (
                <Button disabled>연습 시작하기</Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <span className="mr-1 text-green-point">{`${questionCount}`}</span>
                  문항 연습 시작하기
                </Button>
              )}
              {/* <DrawerClose className='hidden'>
              <Button variant="outline" disabled>연습 시작하기</Button>
            </DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </AuthSignedIn>
      <AuthSignedOut>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mt-[6px] hidden w-full desktop:flex">
              실전연습하기
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn('fixed')}>
            <AlertDialogTitle />
            <AlertDialogDescription />
            <SignInView callbackUrl="/practice" />
          </AlertDialogContent>
        </AlertDialog>
      </AuthSignedOut>
    </div>
  );
};
