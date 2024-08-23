'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { ArchiveDetailDTO } from '@/entities/types';
import { cn } from '@/lib/utils';

import { usePracticeQuestions } from '../../hooks/use-get-questions';

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
  const { questions, isSuccess } = usePracticeQuestions(archiveId);

  useEffect(() => {
    resetChecked && setChecked(false);
    if (selectAll) {
      setChecked(true);
      questions &&
        setSelectArchives((prev) => {
          return prev.some((item) => item.archiveId === archiveId)
            ? prev
            : [...prev, questions];
        });
    }
  }, [resetChecked, selectAll, setSelectArchives, archiveId, isSuccess]);

  const handleCheck = () => {
    !checked && questions
      ? setSelectArchives((prev) => [...prev, questions])
      : setSelectArchives((prev) => {
          return prev.filter((questions) => {
            if (questions.archiveId === archiveId) {
              return false;
            } else return true;
          });
        });
    setChecked((prev) => !prev);
  };

  return (
    <>
      {isSuccess ? (
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
                // onClick={handleCheck}
              >
                <Checkbox
                  className="m-[2px] size-5"
                  checked={checked}
                  onCheckedChange={handleCheck}
                />
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
      ) : (
        <div
          className={cn(
            'flex flex-row pt-1.5 pl-6 pb-3 border border-solid-gray-100 bg-white',
          )}
        >
          <div className="flex w-[506px] flex-col">
            <div className="flex flex-row items-center font-semibold">
              <div
                className="size-11 rounded-full p-[10px] hover:bg-blue-100"
                // onClick={handleCheck}
              >
                <Checkbox
                  className="m-[2px] size-5"
                  disabled
                  checked={checked}
                  onCheckedChange={handleCheck}
                />
              </div>
              <div className="truncate text-base text-blue-800">
                제목 불러오는중
              </div>
            </div>
            <span className="ml-11 h-8 w-fit items-center rounded-sm bg-white px-2.5 py-2 text-2xs">
              회사이름 불러오는중
            </span>
          </div>
          <button className="ml-4">
            <ChevronRight className={checked ? 'text-blue-800' : 'invisible'} />
          </button>
        </div>
      )}
    </>
  );
}
