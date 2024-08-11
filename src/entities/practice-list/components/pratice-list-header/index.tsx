import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FilterType, HintType } from '../..';

interface HeaderProp {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  setHint: Dispatch<SetStateAction<HintType>>;
}

export default function PracticeListHeader({ setFilter, setHint }: HeaderProp) {
  return (
    <div className="flex h-[44px] w-full flex-row items-center justify-between pl-[24px] text-sm text-gray-500">
      <div className="flex h-full items-center">
        <Checkbox className="m-[10px] size-6" />
        <span className="ml-[66px]">면접질문</span>
      </div>
      <div className="flex flex-row items-center justify-around ">
        <span className="mr-[65px]">답변시간</span>
        <span className="mr-[65px]">연습횟수</span>
        <Select
          onValueChange={(value: HintType) => {
            setHint(value);
          }}
        >
          <SelectTrigger className="mr-[30px] flex h-full w-fit flex-row justify-center border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0">
            <span className="">힌트</span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="on">
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
        <Select
          onValueChange={(value: FilterType) => {
            setFilter(value);
          }}
        >
          <SelectTrigger className="mr-[20px] flex h-full w-fit flex-none flex-row justify-center ring-0 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="최근 순" className="w-fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="recent">최근 순</SelectItem>
              <SelectItem value="old">오래된 순</SelectItem>
              <SelectItem value="mostCount">연습횟수 많은 순</SelectItem>
              <SelectItem value="leastCount">연습횟수 적은 순</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
