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
  setQuestion: Dispatch<SetStateAction<ArchiveDetailDTO[]>>;
}

export default function MyResumeSelection({
  title,
  companyName,
  resetChecked,
  setQuestion,
  selectAll,
  archiveId,
}: ResumeSelection) {
  const [checked, setChecked] = useState(false);
  const { archive, isError } = useArchive(archiveId);
  useEffect(() => {
    //reset the check value
    resetChecked && setChecked(false);

    //Add ALL question  to the list
    if (archive && selectAll) {
      setChecked(true);
      setQuestion((prev) => {
        return prev.some((item) => item.archiveId === archiveId)
          ? prev
          : [...prev, archive];
      });
    } else {
      setChecked(false);
    }
  }, [resetChecked, selectAll, setQuestion, archiveId, archive]);

  const handleCheck = () => {
    setChecked((prev) => {
      return !prev;
    });
    !checked && archive
      ? setQuestion((prev) => [...prev, archive])
      : setQuestion((prev) => {
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
