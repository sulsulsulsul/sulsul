'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArchiveQuestionItem } from '@/entities/types';
import { cn } from '@/lib/utils';
import { useSelectedQuestionStore } from '@/store/modal';

import { usePracticeQuestions } from '../../hooks';
import PracticeModalQuestionSelection from '../practice-question-selection';

interface QuestionSelectionType {
  allResume: boolean;
  finalList: ArchiveQuestionItem[];
  setFinalList: Dispatch<SetStateAction<ArchiveQuestionItem[]>>;
  focusedResume: number;
  selectedArchiveIds: number[];
  setSelectedArchiveIds: Dispatch<SetStateAction<number[]>>;
  selectedQuestionIds: number[];
  setSelectedQuestionIds: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeModalQuestionSection({
  allResume,
  finalList,
  setFinalList,
  focusedResume,
  selectedArchiveIds,
  setSelectedArchiveIds,
  selectedQuestionIds,
  setSelectedQuestionIds,
}: QuestionSelectionType) {
  const { questions } = usePracticeQuestions(focusedResume);
  const [answerFilter, setAnswerFilter] = useState<CheckedState>(false);
  const [hintFilter, setHintFilter] = useState<CheckedState>(false);

  const { preSelectQuestionId, setPreSelectQuestionId } =
    useSelectedQuestionStore();

  const handleFilter = useCallback(
    (list: ArchiveQuestionItem[]) => {
      return list?.filter((item) => {
        const answerCondition = !answerFilter || !item.isAnswered;
        const hintCondition = !hintFilter || item.isHint;
        return answerCondition && hintCondition;
      });
    },
    [answerFilter, hintFilter],
  );

  const resetQuestionList = useCallback(() => {
    setAnswerFilter(false);
    setHintFilter(false);
    setSelectedQuestionIds([]);
    setFinalList((prev) =>
      prev.filter((item) => {
        return (
          questions &&
          questions.questions.every(
            (item2) => item.questionId !== item2.questionId,
          )
        );
      }),
    );
  }, [questions]);

  const modifiedQuestionByFilter =
    questions && (answerFilter || hintFilter)
      ? handleFilter(questions!.questions.flat())
      : questions?.questions;

  // useEffect(() => {
  //   if (questions && (answerFilter || hintFilter)) {
  //     setFinalList((prev) => {
  //       return handleFilter(prev);
  //     });
  //   }
  // }, [answerFilter, hintFilter]);

  useEffect(() => {
    if (questions) {
      if (!selectedArchiveIds.includes(focusedResume)) {
        if (preSelectQuestionId != 0) {
          setSelectedQuestionIds([preSelectQuestionId]);
          setFinalList(
            questions.questions.filter(
              (value) => value.questionId === preSelectQuestionId,
            ),
          );
          setPreSelectQuestionId(0);
        } else {
          setSelectedQuestionIds(
            questions.questions.map((value) => value.questionId),
          );
          setFinalList((prev) =>
            [...prev, ...questions.questions].filter(
              (item, index, self) =>
                index ===
                self.findIndex((t) => t.questionId === item.questionId),
            ),
          );
        }
      } else {
        const x = finalList.filter((item) =>
          questions.questions.some(
            (item2) => item2.questionId == item.questionId,
          ),
        );
        setSelectedQuestionIds(x.map((item) => item.questionId));
      }
      if (allResume) {
        setSelectedQuestionIds(
          questions.questions.map((item) => item.questionId),
        );
      }
    }
  }, [focusedResume, questions]);

  useEffect(() => {
    if (selectedQuestionIds.length === 0) {
      setSelectedArchiveIds((prev) =>
        prev.filter((item) => {
          return item !== focusedResume;
        }),
      );
    } else {
      if (!selectedArchiveIds.includes(focusedResume)) {
        setSelectedArchiveIds((prev) => [...prev, focusedResume]);
      }
    }
  }, [selectedQuestionIds, focusedResume]);

  return (
    <div className="flex w-1/2 flex-col">
      <section className="flex h-12 w-full flex-row text-xs leading-5 text-gray-500">
        <div
          className={cn(
            'flex w-full flex-row items-center justify-between border border-b-0 border-gray-100',
          )}
        >
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
                  <label htmlFor="notAnswered">
                    <Checkbox
                      id="notAnswered"
                      className="ml-[14px] mr-[6px] size-5 p-[2px]"
                      onCheckedChange={(check: CheckedState) =>
                        setAnswerFilter(check)
                      }
                      checked={answerFilter}
                    />
                    답변 못한 질문만
                  </label>
                </div>
                <div className="flex h-[46px] w-full flex-row items-center">
                  <label htmlFor="usedHint">
                    <Checkbox
                      id="usedHint"
                      className="ml-[14px] mr-[6px] size-5 p-[2px]"
                      onCheckedChange={(check: CheckedState) =>
                        setHintFilter(check)
                      }
                      checked={hintFilter}
                    />
                    힌트 본 질문만
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="mx-1 py-3">
                          <Image
                            src="/images/icons/icon-information circle.svg"
                            width={20}
                            height={20}
                            alt="icon"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="fixed left-4 top-0.5 ml-1 h-[45px] w-[265px] overflow-visible rounded-[10px] border-none bg-gray-700 px-4 py-[12px] text-white">
                        <div>
                          <Image
                            className="absolute left-[-8px] top-[15.5px]"
                            src="/images/polygonInfo.svg"
                            alt="polygonInfo"
                            width={8}
                            height={14}
                          />
                          <div className="flex size-full flex-row align-middle  text-sm">
                            답변은 했지만 힌트를 본 질문도 포함돼요.
                          </div>
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
      <section>
        <div className="flex h-[68px] w-full items-center border border-gray-100 pl-[24px] text-base">
          <label htmlFor={'questions'} className="flex h-full items-center">
            <Checkbox
              id="questions"
              className="m-[10px] size-5 p-[2px] "
              checked={
                questions &&
                questions?.questions.length === selectedQuestionIds.length
              }
              onCheckedChange={(check: CheckedState) => {
                if (questions) {
                  check
                    ? (setFinalList((prev) => [
                        ...prev,
                        ...questions.questions,
                      ]),
                      setSelectedQuestionIds(
                        questions.questions.map((value) => value.questionId),
                      ))
                    : (setSelectedQuestionIds([]),
                      setFinalList((prev) =>
                        prev.filter((item) => {
                          return questions.questions.every(
                            (item2) => item.questionId !== item2.questionId,
                          );
                        }),
                      ));
                }
              }}
            />
            예상 문제 전체
          </label>
        </div>
      </section>
      <section className="h-[300px] overflow-scroll border-x border-gray-100 ">
        {modifiedQuestionByFilter &&
          modifiedQuestionByFilter.map((value, index) => {
            return (
              <PracticeModalQuestionSelection
                index={index}
                key={value.questionId}
                setSelectedQuestionIds={setSelectedQuestionIds}
                finalList={finalList}
                setFinalList={setFinalList}
                questionProp={value}
                questionId={value.questionId}
              />
            );
          })}
      </section>
    </div>
  );
}
