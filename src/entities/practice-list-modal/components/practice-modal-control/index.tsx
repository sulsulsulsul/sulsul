import { Dispatch, SetStateAction } from 'react';
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

interface OptionSectionProp {
  reset: () => void;
  setAnswerFilter: Dispatch<SetStateAction<CheckedState>>;
  answerFilter: CheckedState;
  setHintFilter: Dispatch<SetStateAction<CheckedState>>;
  hintFilter: CheckedState;
  resetQuestionList: () => void;
}

export default function PracticeModalControl({
  reset,
  setAnswerFilter,
  answerFilter,
  setHintFilter,
  hintFilter,
  resetQuestionList,
}: OptionSectionProp) {
  return (
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
  );
}
