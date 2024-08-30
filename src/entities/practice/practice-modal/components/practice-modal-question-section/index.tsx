'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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

import QuestionSelection from '../practice-question-selection';

interface QuestionSelectionType {
  selectedArchiveIds: number[];
  resetQuestion: boolean;
  setFinalList: Dispatch<SetStateAction<ModalQuestionType[]>>;
  resetQuestionList: () => void;
  answerFilter: CheckedState;
  setAnswerFilter: Dispatch<SetStateAction<CheckedState>>;
  hintFilter: CheckedState;
  setHintFilter: Dispatch<SetStateAction<CheckedState>>;
  allQuestions: CheckedState;
  setAllQuestions: Dispatch<SetStateAction<CheckedState>>;
}

export default function PracticeModalQuestionSection({
  selectedArchiveIds,
  setFinalList,
  resetQuestion,
  resetQuestionList,
  allQuestions,
  answerFilter,
  hintFilter,
  setAllQuestions,
  setHintFilter,
  setAnswerFilter,
}: QuestionSelectionType) {
  return (
    <div className="flex w-1/2 flex-col">
      <section className="flex h-12 w-full flex-row text-xs leading-5 text-gray-500">
        <div className="flex w-full flex-row items-center justify-between border border-gray-100">
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
              checked={allQuestions}
              onCheckedChange={(check: CheckedState) => {
                setAllQuestions(check);
                !check && resetQuestionList();
              }}
            />
            예상 문제 전체
          </label>
        </div>
      </section>
      <section className="h-[300px] overflow-scroll">
        {selectedArchiveIds.map((value) => {
          return (
            <QuestionSelection
              key={value}
              archiveId={value}
              resetQuestion={resetQuestion}
              setFinalQuestions={setFinalList}
              selectAll={allQuestions}
              answerFilter={answerFilter}
              hintFilter={hintFilter}
            />
          );
        })}
      </section>
    </div>
  );
}
