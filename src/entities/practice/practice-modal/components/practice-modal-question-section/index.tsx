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
import { ModalQuestionType } from '@/entities/types/question';

import { usePracticeQuestions } from '../../hooks';
import PracticeModalQuestionItems from '../practice-question-selection/question-modal-items';

interface QuestionSelectionType {
  selectedArchiveIds: number[];
  setSelectArchiveIds: Dispatch<SetStateAction<number[]>>;

  allResume: boolean;
  setAllResume: Dispatch<SetStateAction<boolean>>;

  finalList: ModalQuestionType[];
  setFinalList: Dispatch<SetStateAction<ModalQuestionType[]>>;

  resetQuestionList: () => void;

  answerFilter: CheckedState;
  setAnswerFilter: Dispatch<SetStateAction<CheckedState>>;

  hintFilter: CheckedState;
  setHintFilter: Dispatch<SetStateAction<CheckedState>>;

  focusedResume: number;
  setFocusedResume: Dispatch<SetStateAction<number>>;

  selectedQuestionIds: number[];
  setSelectedQuestionIds: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeModalQuestionSection({
  selectedArchiveIds,
  setSelectArchiveIds,

  allResume,
  setAllResume,

  finalList,
  setFinalList,

  resetQuestionList,

  answerFilter,
  setAnswerFilter,
  hintFilter,
  setHintFilter,

  focusedResume,
  setFocusedResume,

  selectedQuestionIds,
  setSelectedQuestionIds,
}: QuestionSelectionType) {
  const { questions } = usePracticeQuestions(focusedResume);

  const handleFilter = useCallback(
    (list: ModalQuestionType[]) => {
      return list?.filter((item) => {
        const answerCondition = !answerFilter || !item.isAnswered;
        const hintCondition = !hintFilter || item.isHint;
        return answerCondition && hintCondition;
      });
    },
    [answerFilter, hintFilter],
  );

  const modifiedQuestionByFilter =
    questions && (answerFilter || hintFilter)
      ? handleFilter(questions!.questions.flat())
      : questions?.questions;

  useEffect(() => {
    if (questions && (answerFilter || hintFilter)) {
      setFinalList((prev) => {
        return handleFilter(prev);
      });
    }
  }, [answerFilter, hintFilter]);

  useEffect(() => {
    if (questions) {
      setSelectedQuestionIds(
        questions.questions.map((value) => value.questionId),
      );
      setFinalList((prev) =>
        [...prev, ...questions.questions].filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.questionId === item.questionId),
        ),
      );
    }
  }, [focusedResume, questions]);

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
                        <>
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
                        </>
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
          <label htmlFor={'questions'}>
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
                        prev.filter(
                          (item) => !questions.questions.includes(item),
                        ),
                      ));
                }
              }}
            />
            예상 문제 전체
          </label>
        </div>
      </section>
      <section className="h-[300px] overflow-scroll">
        {modifiedQuestionByFilter &&
          modifiedQuestionByFilter.map((value) => {
            return (
              <PracticeModalQuestionItems
                key={value.questionId}
                selectedQuestionIds={selectedQuestionIds}
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
