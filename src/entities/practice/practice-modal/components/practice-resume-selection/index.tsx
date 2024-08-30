'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { ArchiveDetailDTO } from '@/entities/types';
import { cn } from '@/lib/utils';

import { usePracticeQuestions } from '../../hooks/use-get-modal-questions';

interface ResumeSelection {
  title: string;
  companyName: string;
  resetChecked: boolean;
  archiveId: number;
  selectAll: CheckedState;
  setSelectArchiveIds: Dispatch<SetStateAction<number[]>>;
}

export default function MyResumeSelection({
  title,
  companyName,
  resetChecked,
  setSelectArchiveIds,
  selectAll,
  archiveId,
}: ResumeSelection) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    resetChecked && setChecked(false);
    if (selectAll) {
      setChecked(true);
      setSelectArchiveIds((prev) => {
        return prev.includes(archiveId) ? prev : [...prev, archiveId];
      });
    }
  }, [resetChecked, selectAll, archiveId]);

  const handleCheck = () => {
    !checked
      ? setSelectArchiveIds((prev) => [...prev, archiveId])
      : setSelectArchiveIds((prev) => {
          return prev.filter((item) => {
            return item !== archiveId;
          });
        });
    setChecked((prev) => !prev);
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
        <span
          className={cn(
            'ml-11 h-8 w-fit items-center rounded-sm px-2.5 py-2 text-2xs',
            checked ? 'bg-white' : 'bg-gray-100',
          )}
        >
          {companyName}
        </span>
      </div>
      <button className="ml-4">
        <ChevronRight className={checked ? 'text-blue-800' : 'invisible'} />
      </button>
    </div>
  );
}
