'use client';

import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
import { PracticingListType } from '@/entities/types/question';
import { cn } from '@/lib/utils';
import { usePracticeStore } from '@/store/practiceStore';

import { usePracticeDetail } from '../../hooks/use-get-practice-detail';
import {
  useCreatePractice,
  usePracticeQuestions,
  useResumes,
} from '../../practice-modal/hooks';

interface PracticeStartCardProps extends HTMLAttributes<HTMLDivElement> {
  nickname: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

type QUESTCOLLECTION = {
  archiveId: number;
  collection: number[];
  allQuestion: boolean;
  resumeTitle: string;
};

export const PracticeStartCard = ({
  className,
  nickname,
  setModalOpen,
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

  const { resume } = useResumes();
  const { questions } = usePracticeQuestions(focusedResume);

  //전체 자소서 선택

  const finalList = [...new Set(collection.flatMap((item) => item.collection))];

  const shuffledList = (list: number[]) => {
    const newList = [...list];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  };

  const handleAllResume = () => {};

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

  const questionCount = collection.flatMap((item) => item.collection).length;
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-4xl font-bold">
        <p>
          <span className="text-blue-500">{nickname}</span>님,
        </p>
        <p>지피지기면 백전백승이에요!</p>
      </h2>
      <div className="flex items-center justify-center">
        <Image
          className="animate-cheering-animation"
          src={'/images/character-cheering.svg'}
          alt="cheering character"
          width={162}
          height={145}
        />
      </div>
      <Button
        className="w-full mobile:hidden"
        onClick={() => setModalOpen(true)}
      >
        실전 연습하기
      </Button>
      <Drawer>
        <DrawerTrigger className="overflow-scroll">
          <Button className="w-full desktop:hidden">실전 연습하기</Button>
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
                      {selectedResume === '' ? '내 자기소개서' : selectedResume}
                      {openResume ? (
                        <ChevronUp color="#B9BCCC" />
                      ) : (
                        <ChevronDown color="#B9BCCC" />
                      )}
                    </button>
                    {openResume && (
                      <div className="absolute left-0 top-[50px] z-[70] flex h-[400px] w-full flex-col overflow-scroll bg-white">
                        <div
                          className=" h-[61px] w-full justify-center border-[0.5px] border-gray-200 py-3 pl-4 text-sm font-normal"
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
                          <>loading...</>
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
                          key={index}
                          className="flex h-[78px] w-full flex-col justify-center  rounded-2xl bg-gray-50 px-4 "
                        >
                          <div className="flex w-full flex-row justify-between text-sm  font-medium">
                            {value.resumeTitle}
                            <button
                              onClick={() =>
                                setCollection((prev) =>
                                  prev.splice(index - 1, 1),
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
    </div>
  );
};
