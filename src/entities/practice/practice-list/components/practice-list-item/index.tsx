'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { QuestionSearchType } from '@/entities/types/question';
import { useFocusedQuestionCard } from '@/store/practiceStore';

import { useUpdateQuestionStar } from '../../hook/use-update-question-star';

interface PracticeListItemProps {
  question: QuestionSearchType;
  selectedQuestions: number[];
  setSelectedQuestions: Dispatch<SetStateAction<number[]>>;
}

export default function PracticeListItem({
  question,
  selectedQuestions,
  setSelectedQuestions,
}: PracticeListItemProps) {
  const { mutate } = useUpdateQuestionStar();
  const [starClicked, setStarClicked] = useState(question.star);

  const handleStarClick = () => {
    setStarClicked((prev) => !prev);
    mutate({ questionId: question.questionId, star: !question.star });
  };

  const { setQuestionId } = useFocusedQuestionCard();

  const handleLinkClick = async () => {
    await setQuestionId(question.questionId);
  };

  const handleCheckBox = () => {
    selectedQuestions.includes(question.questionId)
      ? setSelectedQuestions(
          selectedQuestions.filter((id) => id !== question.questionId),
        )
      : setSelectedQuestions([...selectedQuestions, question.questionId]);
  };

  return (
    <div className="flex h-[118px] w-full flex-row items-center justify-between rounded-md border border-gray-100 bg-white py-[26px] pl-[24px]">
      <div className="flex items-center justify-between gap-1">
        <Checkbox
          className="m-[10px] size-6"
          checked={selectedQuestions.includes(question.questionId)}
          onCheckedChange={handleCheckBox}
        />
        <button onClick={handleStarClick}>
          {starClicked ? (
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
          <div className="truncate">{question.archive.title}</div>
          <div className="flex w-full flex-row items-center gap-[6px] text-gray-500">
            <div className="w-fit flex-none rounded-sm bg-gray-100 px-2.5  py-[7px]">
              {question.archive.companyName}
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
        {question.hint ? (
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/images/icons/icn-more-gray.svg"
              width={24}
              height={24}
              alt="icon"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute h-[62px] w-[180px] rounded-sm">
            <DropdownMenuItem className="justify-item-center flex size-full items-center bg-white pl-1.5 pr-[76px] focus:bg-white">
              <Link
                onClick={handleLinkClick}
                className="w-fit text-lg"
                href={`/archive/${question.archive.archiveId}`}
              >
                답변 수정하기
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
