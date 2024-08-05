'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Switch } from '@/components/ui/swtich';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePracticeStore } from '@/store/practiceStore';

import { useArchives } from '../archives/hooks';
import { ArchiveDetailDTO, ArchiveQuestionItem } from '../types/archive';
import ModalHeader from './components/modal-header';
import MyResumeSelection from './components/my-resume-selection';
import QuestionSelection from './components/practice-question-selection';
import { useCreatePractice } from './hooks/use-create-practice';

interface PracticeSelectionProp {
  setModal: Dispatch<SetStateAction<boolean>>;
  //다시 하기 눌렀을떄 해당 resume 체크
  resumeId?: number;
}

//TODO: clean up  annotation
export default function PracticeSelection({
  setModal,
  resumeId,
}: PracticeSelectionProp) {
  const router = useRouter();
  //Get Archives
  const { archives } = useArchives();

  //Store Final PracticeList
  const { setStore } = usePracticeStore();

  //To trigger reset to resume component checkbox
  const [resetResume, setResetResume] = useState(false);

  //To trigger reset to question component checkbox
  const [resetQuestion, setResetQuestion] = useState(false);

  //Collection of ArchviesDetail
  //ArchiveId 랑 비교해서, 추후 빼야될때
  const [questionArchiveList, setQuestionArchiveList] = useState<
    ArchiveDetailDTO[]
  >([]);

  //Final List of practice
  const [finalList, setFinalList] = useState<ArchiveQuestionItem[]>([]);

  const [answerFilter, setAnswerFilter] = useState<CheckedState>(false);
  const [hintFilter, setHintFilter] = useState<CheckedState>(false);

  const [allResumes, setAllResumes] = useState<CheckedState>(false);
  const [allQuestions, setAllQuestions] = useState<CheckedState>(false);

  //Other Option
  const [timer, setTimer] = useState(false);
  const [random, setRandom] = useState(false);

  const { data, mutate, isSuccess, isError } = useCreatePractice(
    finalList.flatMap((value) => value.questionId),
  );

  const shuffledList = useMemo(() => {
    const newList = [...finalList];
    for (let i = finalList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  }, [finalList]);

  //Refact: useMemo
  const filteredList =
    answerFilter || hintFilter
      ? questionArchiveList
          .flatMap((value) => {
            return value.questions;
          })
          .filter((item) => {
            //답변 못한 질문 isAnswered == false 일때 필터
            const answerCondition = !answerFilter || !item.isAnswered;
            //힌트 본 질문 isHint == true 일때
            const hintCondition = !hintFilter || item.isHint;
            return answerCondition && hintCondition;
          })
      : [];

  //reset
  //TODO : ReFactor: useCallBack
  const reset = () => {
    setResetResume(true);
    setAllQuestions(false);
    setAllResumes(false);
    setQuestionArchiveList([]);
  };
  const resetQuestionList = () => {
    setResetQuestion(true);
    setAllQuestions(false);
    setAnswerFilter(false);
    setHintFilter(false);
    setFinalList([]);
  };

  useEffect(() => {
    setResetQuestion(false);
    setResetResume(false);
    allQuestions && finalList.length === 0 && setAllQuestions(false);
    isSuccess &&
      data &&
      (setStore({
        timer: timer,
        practiceList: random ? shuffledList : finalList,
        practiceId: data,
      }),
      router.push('/practice/ing'));
  }, [allQuestions, finalList, isSuccess]);

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    finalList.length === 0 && alert('예상질문을 하나라도 선택해주세요! ');
    mutate();
  };

  return (
    <div
      className={cn(
        'fixed flex  w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
      )}
    >
      <div className="flex w-[75rem] flex-col rounded-md border border-gray-100 bg-white">
        <ModalHeader />
        <section className="flex h-12 flex-row text-xs leading-5 text-gray-500">
          <div className="flex w-1/2 items-center justify-between border border-gray-100">
            <div className="ml-[36px]">내 자기소개서</div>
            <div className="mr-[28px]">
              <button
                className="flex flex-row items-center gap-[2px]"
                onClick={reset}
              >
                <Image
                  src="/images/icons/icon-redo.svg"
                  alt="redo-icon"
                  width={24}
                  height={24}
                />
                선택 초가화
              </button>
            </div>
          </div>
          <div className="flex w-1/2 flex-row items-center justify-between border border-gray-100">
            <div className="ml-[24px]">예상 면접질문</div>
            <div className="flex flex-row gap-4">
              <Popover>
                <PopoverTrigger className="flex flex-row items-center gap-[2px]">
                  <div className="flex flex-row items-center">
                    <Image
                      src="/images/icons/icon-filter.svg"
                      alt="filter-Icon"
                      width={24}
                      height={24}
                    />
                    상세 필터
                  </div>
                </PopoverTrigger>
                <PopoverContent className="z-[60] mr-[134px] flex w-[180px] flex-col rounded-sm border border-gray-100 px-0 py-2">
                  <div className="flex h-[46px] w-full flex-row items-center">
                    <Checkbox
                      className="ml-[14px] mr-[6px] size-5 p-[2px]"
                      onCheckedChange={(check: CheckedState) =>
                        setAnswerFilter(check)
                      }
                      checked={answerFilter}
                    />
                    답변못한 질문만
                  </div>
                  <div className="flex h-[46px] w-full flex-row items-center">
                    <Checkbox
                      className="ml-[14px] mr-[6px] size-5 p-[2px]"
                      onCheckedChange={(check: CheckedState) =>
                        setHintFilter(check)
                      }
                      checked={hintFilter}
                    />
                    힌트 본 질문만
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="mx-1 py-3">
                            <Image
                              src="/images/icons/icon-information circle.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="fixed left-4 top-0.5 ml-1 h-[45px] w-[265px] overflow-auto rounded-[10px] border-none bg-gray-700 px-4 py-[16px] text-white">
                          <div className="size-full items-center">
                            <Image
                              className="absolute -left-2 top-4"
                              src="/images/polygonInfo.svg"
                              alt="polygonInfo"
                              width={8}
                              height={14}
                            />
                            답변은 했지만 힌트를 본 질문도 포함돼요.
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="mr-[32px]">
                <button
                  className="flex flex-row items-center gap-[2px]"
                  onClick={resetQuestionList}
                >
                  <Image
                    src="/images/icons/icon-redo.svg"
                    alt="redo-icon"
                    width={24}
                    height={24}
                  />
                  선택 초기화
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full flex-row">
          <div className="flex h-[68px] w-1/2 items-center border border-gray-100 pl-[24px] text-base">
            <Checkbox
              className="m-[10px] size-5 p-[2px]"
              checked={allResumes}
              onCheckedChange={(check: CheckedState) => {
                setAllResumes(check);
                !check && reset();
              }}
            />
            내 자기소개서 전체
          </div>
          <div className="flex h-[68px] w-1/2 items-center border border-gray-100 pl-[24px] text-base">
            <Checkbox
              className="m-[10px] size-5 p-[2px]"
              checked={allQuestions}
              onCheckedChange={(check: CheckedState) => {
                setAllQuestions(check);
                !check && resetQuestionList();
              }}
            />
            예상 문제 전체
          </div>
        </section>
        <section className="flex flex-row">
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {archives?.map((value) => {
              return (
                <MyResumeSelection
                  key={value.archiveId}
                  resetChecked={resetResume}
                  setQuestion={setQuestionArchiveList}
                  selectAll={allResumes}
                  archiveId={value.archiveId}
                  title={value.title}
                  companyName={value.companyName}
                />
              );
            })}
          </div>
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {hintFilter || answerFilter || filteredList.length !== 0
              ? filteredList.map((value: ArchiveQuestionItem) => {
                  return (
                    <QuestionSelection
                      key={value.questionId}
                      questionProp={value}
                      questionId={value.questionId}
                      resetQuestion={resetQuestion}
                      setFinalQuestions={setFinalList}
                      selectAll={allQuestions}
                    />
                  );
                })
              : questionArchiveList
                  .flatMap((value) => {
                    return value.questions;
                  })
                  .map((value: ArchiveQuestionItem, index) => {
                    return (
                      <QuestionSelection
                        key={value.questionId}
                        questionProp={value}
                        questionId={value.questionId}
                        resetQuestion={resetQuestion}
                        setFinalQuestions={setFinalList}
                        selectAll={allQuestions}
                      />
                    );
                  })}
          </div>
        </section>
        <section className="flex h-[98px] flex-row">
          <div className="flex w-1/2 flex-col justify-center border-y pl-[32px]">
            문제 순서
            <RadioGroup
              defaultValue={'order'}
              onValueChange={(value) => setRandom(value === 'random')}
              className="flex flex-row gap-[46px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="order" id="option-one" />
                <div>내 자기소개순서 단위별</div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="random" id="option-two" />
                <div>랜덤으로</div>
              </div>
            </RadioGroup>
          </div>
          <div className="flex w-1/2 flex-row items-center justify-between border-y border-y-gray-100 pl-[24px]">
            <div className="flex flex-col">
              <span>타이머</span>
              <span>회면의 오른쪽 맨 위에서 타이머를 사용할수있어요.</span>
            </div>
            <Switch
              className="mr-[36px]"
              onCheckedChange={(check: CheckedState) => {
                setTimer(check ? true : false);
              }}
            />
          </div>
        </section>
        <section className="mb-[20px] mr-[36px] mt-[16px] flex flex-row gap-2 self-end">
          <Button size={'default'} variant={'ghost'} onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSubmit}>문항연습 시작</Button>
        </section>
      </div>
    </div>
  );
}
