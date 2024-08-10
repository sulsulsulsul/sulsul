import Image from 'next/image';

import { Checkbox } from '@/components/ui/checkbox';
import { PracticeQuestionsProps } from '@/entities/dashboard/components/practice-questions';
interface PracticeListItemProps {
  archiveId: number;
  title: string;
  content: string;
  companyName: string;
  isStar: boolean;
  isHint: boolean;
  questionId: number;
  practiceCount: number;
  practiceTime: number;
}

export default function PracticeListItem({
  archiveId,
  title,
  content,
  companyName,
  isStar,
  isHint,
  questionId,
  practiceCount,
  practiceTime,
}: PracticeListItemProps) {
  //Get Archives
  //Get Archive by archive Id
  //Get Qustions by QuestionsId in Archive

  return (
    <div className="flex h-[118px] w-full flex-row items-center justify-between rounded-md border border-gray-100 bg-white py-[26px] pl-[24px]">
      <Checkbox />
      <button>
        {isStar ? (
          <Image
            src="/images/icons/star-active.svg"
            width={24}
            height={24}
            alt="icon"
          />
        ) : (
          <Image
            src="/images/icons/star-inactive.svg"
            width={24}
            height={24}
            alt="icon"
          />
        )}
      </button>
      <div className="flex w-[588px] flex-col">
        <div className="truncate">{title}</div>
        <div className="flex flex-row">
          <div>{companyName}</div>
          <div>{content}</div>
        </div>
      </div>
      <div className="mr-[60px] flex flex-row items-center justify-center gap-x-[80px]">
        <span className="w-[38px] text-base">
          {practiceTime.toString() + ' 초'}
        </span>
        <span className="w-[38px]">{practiceCount.toString() + ' 회'}</span>
        {isHint ? (
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
        <button>
          <Image
            src="/images/icons/icn-more-gray.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
}
