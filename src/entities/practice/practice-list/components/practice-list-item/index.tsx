'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { QuestionDetailType } from '@/entities/types/question';

import { useUpdateQuestionStar } from '../../hook/use-update-question-star';
interface PracticeListItemProps {
  question: QuestionDetailType;
  setSelectQuestion: Dispatch<SetStateAction<QuestionDetailType[]>>;
}

export default function PracticeListItem({
  setSelectQuestion,
  question,
}: PracticeListItemProps) {
  const { mutate } = useUpdateQuestionStar();
  const [starClicked, setStarClicked] = useState(question.isStar);
  const handleStarClick = () => {
    mutate({ questionId: question.questionId, star: !starClicked });
    setStarClicked((prev) => !prev);
  };

  return (
    <div className="flex h-[118px] w-full flex-row items-center justify-between rounded-md border border-gray-100 bg-white py-[26px] pl-[24px]">
      <div className="flex items-center justify-between gap-1">
        <Checkbox
          className="m-[10px] size-6"
          onCheckedChange={(check) =>
            check
              ? setSelectQuestion((prev) => {
                  return [...prev, question];
                })
              : setSelectQuestion((prev) => {
                  return prev.filter((value) => {
                    return value.questionId !== question.questionId;
                  });
                })
          }
        />
        <button onClick={handleStarClick}>
          {question.isStar ? (
            <Image
              src="/images/icons/star-active.svg"
              width={24}
              height={24}
              className="m-[10px]"
              alt="icon"
            />
          ) : (
            <Image
              src="/images/icons/star-inactive.svg"
              width={24}
              height={24}
              className="m-[10px]"
              alt="icon"
            />
          )}
        </button>

        <div className="ml-4 flex w-[588px] flex-col gap-2">
          <div className="truncate">{question.title}</div>
          <div className="flex w-full flex-row items-center gap-[6px] text-gray-500">
            <div className="w-fit flex-none rounded-sm bg-gray-100 px-2.5  py-[7px]">
              {question.companyName}
            </div>
            <div className="max-w-full grow truncate ">{question.content}</div>
          </div>
        </div>
      </div>
      <div className="mr-[60px] flex flex-row items-center justify-center gap-x-[80px]">
        <span className="w-[38px] text-base">
          {question.practiceTime.toString() + ' 초'}
        </span>
        <span className="w-[38px]">
          {question.practiceCount.toString() + ' 회'}
        </span>
        {question.isHint ? (
          <Image
            src="/images/icons/icon-eye-on.svg"
            width={24}
            height={24}
            alt="icon"
          />
        ) : (
          <Image
            src="/images/icons/icon-eye-off.svg"
            width={24}
            height={24}
            alt="icon"
          />
        )}

        {/* {TODO:FIX THE LINK POSSIBLE USE ROUTER PUSH WITH QUERY BEHIND  } */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {' '}
            <Image
              src="/images/icons/icn-more-gray.svg"
              width={24}
              height={24}
              alt="icon"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/archive/${question.archiveId}`}>blah</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
