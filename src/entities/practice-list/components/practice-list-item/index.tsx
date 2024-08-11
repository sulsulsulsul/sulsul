import Image from 'next/image';
import Link from 'next/link';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  return (
    <div className="flex h-[118px] w-full flex-row items-center justify-between rounded-md border border-gray-100 bg-white py-[26px] pl-[24px]">
      <div className="flex items-center justify-between gap-1">
        <Checkbox className="m-[10px] size-6" />
        <button>
          {isStar ? (
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
          <div className="truncate">{title}</div>
          <div className="flex w-full flex-row items-center gap-[6px] text-gray-500">
            <div className="w-fit flex-none rounded-sm bg-gray-100 px-2.5  py-[7px]">
              {companyName}
            </div>
            <div className="max-w-full grow truncate ">{content}</div>
          </div>
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
              <Link href={'/'}>blah</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
