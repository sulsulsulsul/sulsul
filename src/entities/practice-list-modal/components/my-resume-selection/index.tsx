'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { useArchive } from '@/entities/archives/hooks';
import { ArchiveDetailDTO } from '@/entities/types/archive';
import { cn } from '@/lib/utils';

//예상 면접질문
interface ResumeSelection {
  title: string;
  companyName: string;
  resetChecked: boolean;
  archiveId: number;
  selectAll: CheckedState;
  setSelectArchives: Dispatch<SetStateAction<ArchiveDetailDTO[]>>;
}

export default function MyResumeSelection({
  title,
  companyName,
  resetChecked,
  setSelectArchives,
  selectAll,
  archiveId,
}: ResumeSelection) {
  const [checked, setChecked] = useState(false);
  const { archive, isError } = useArchive(137);

  //FIX: remove MockArchive
  const mockArchive: ArchiveDetailDTO = {
    archiveId: 0,
    companyName: 'string',
    title: 'string',
    resume: 'string',
    status: 'READY',
    questions: [
      {
        questionId: 0,
        content: 'string',
        answer: 'string',
        isAnswered: true,
        isHint: true,
        keywords: [],
      },
    ],
  };

  useEffect(() => {
    resetChecked && setChecked(false);
    if (selectAll) {
      setChecked(true);
      setSelectArchives((prev) => {
        return prev.some((item) => item.archiveId === archiveId)
          ? prev
          : [...prev, mockArchive];
      });
    } else {
      setChecked(false);
    }
  }, [resetChecked, selectAll, setSelectArchives, archiveId, archive]);

  const handleCheck = () => {
    setChecked((prev) => {
      return !prev;
    });
    !checked && mockArchive
      ? setSelectArchives((prev) => [...prev, mockArchive])
      : setSelectArchives((prev) => {
          return prev.filter((archive) => {
            if (archive.archiveId === archiveId) {
              return false;
            } else return true;
          });
        });
  };

  return (
    <div
      className={cn(
        'flex flex-row pt-1.5 pl-6 pb-3 border border-solid-gray-100',
        checked ? 'bg-blue-100' : 'bg-white',
      )}
    >
      <div className="flex w-[506px] flex-col">
        <div className="flex flex-row items-center font-semibold">
          <div
            className="size-11 rounded-full p-[10px] hover:bg-blue-100"
            onClick={handleCheck}
          >
            <Checkbox className="m-[2px] size-5" checked={checked} />
          </div>
          <div className="truncate text-base text-blue-800">{title}</div>
        </div>
        <span className="ml-11 h-8 w-fit items-center rounded-sm bg-white px-2.5 py-2 text-2xs">
          {companyName}
        </span>
      </div>
      <button className="ml-4">
        <ChevronRight className={checked ? 'text-blue-800' : 'invisible'} />
      </button>
    </div>
  );
}
