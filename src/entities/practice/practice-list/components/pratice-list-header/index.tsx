import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterType, HintType } from '@/entities/practice/types';
import { QuestionSearchType } from '@/entities/types/question';

interface HeaderProp {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  setHint: Dispatch<SetStateAction<HintType>>;
  questionList: QuestionSearchType[];
  setPage: Dispatch<SetStateAction<number>>;
  selectedQuestions: number[];
  setSelectedQuestions: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeListHeader({
  setFilter,
  setHint,
  setPage,
  questionList,
  selectedQuestions,
  setSelectedQuestions,
}: HeaderProp) {
  const questionIds =
    questionList && questionList.map((item) => item.questionId);
  const isAllSelected =
    questionIds &&
    questionIds.every((questionId) => selectedQuestions.includes(questionId));

  return (
    <div className="flex h-[44px] w-full flex-row items-center justify-between pl-[24px] pr-[44px] text-sm text-gray-500">
      <div className="flex h-full items-center">
        <Checkbox
          className="m-[10px] size-6"
          checked={isAllSelected}
          onCheckedChange={(check: CheckedState) => {
            check
              ? setSelectedQuestions([
                  ...selectedQuestions,
                  ...questionIds.filter(
                    (id) => !selectedQuestions.includes(id),
                  ),
                ])
              : setSelectedQuestions(
                  selectedQuestions.filter((id) => !questionIds.includes(id)),
                );
          }}
        />
        <span className="ml-[66px]">면접질문</span>
      </div>
      <div className="flex w-fit flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <span className="mr-[65px]">답변시간</span>
          <span className="mr-[65px]">연습횟수</span>
          <Select
            onValueChange={(value: HintType) => {
              setHint(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="flex h-full w-fit flex-row border-none text-black outline-none ring-0 focus:ring-0 focus:ring-offset-0">
              <span className="">힌트</span>
            </SelectTrigger>
            <SelectContent className="ml-4">
              <SelectGroup className="my-2 justify-start">
                <SelectItem value="on" className="justify-start">
                  <Image
                    src="/images/icons/icon-eye-on.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                </SelectItem>
                <SelectItem value="off">
                  <Image
                    src="/images/icons/icon-eye-off.svg"
                    width={24}
                    height={24}
                    alt="icon"
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-4">
          <Select
            onValueChange={(value: FilterType) => {
              setFilter(value);
            }}
          >
            <SelectTrigger className="flex h-full w-[85px] flex-row justify-end p-0 text-black ring-0  focus:ring-0 focus:ring-offset-0">
              <SelectValue
                placeholder="최근 순"
                className="text-right text-sm"
              />
            </SelectTrigger>
            <SelectContent className="ml-4 w-[180px] p-0">
              <SelectGroup className="my-2 flex flex-col justify-start">
                <SelectItem className="pl-4 text-lg" value="recent">
                  최근 순
                </SelectItem>
                <SelectItem className="pl-4 text-lg" value="old">
                  오래된 순
                </SelectItem>
                <SelectItem className="pl-4 text-lg" value="mostCount">
                  <div className="flex flex-row">
                    {' '}
                    연습횟수{' '}
                    <Image
                      src={'/images/icons/icon-arrow_up.svg'}
                      width={20}
                      height={20}
                      alt="icon"
                    />
                  </div>
                </SelectItem>
                <SelectItem className="pl-4 text-lg" value="leastCount">
                  <div className="flex flex-row">
                    {' '}
                    연습횟수{' '}
                    <Image
                      className="rotate-180"
                      src={'/images/icons/icon-arrow_up.svg'}
                      width={20}
                      height={20}
                      alt="icon"
                    />
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
