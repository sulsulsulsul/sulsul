'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { useArchive } from '@/entities/archives/hooks';
import { ArchiveDetailDTO } from '@/entities/types/archive';
import { cn } from '@/lib/utils';

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
  // const { archive } = useArchive(archiveId);
  const archive: ArchiveDetailDTO = {
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
        keywords: [
          {
            keywordId: 0,
            content: 'string',
          },
        ],
      },
      {
        questionId: 1,
        content: 'string',
        answer: 'string',
        isAnswered: true,
        isHint: true,
        keywords: [
          {
            keywordId: 0,
            content: 'string',
          },
        ],
      },
      {
        questionId: 2,
        content: '2',
        answer: 'string',
        isAnswered: false,
        isHint: true,
        keywords: [
          {
            keywordId: 0,
            content: 'string',
          },
        ],
      },
      {
        questionId: 3,
        content: '3',
        answer: 'string',
        isAnswered: true,
        isHint: false,
        keywords: [
          {
            keywordId: 0,
            content: 'string',
          },
        ],
      },
      {
        questionId: 4,
        content: '4',
        answer: 'string',
        isAnswered: false,
        isHint: false,
        keywords: [
          {
            keywordId: 0,
            content: 'string',
          },
        ],
      },
    ],
  };

  // export interface ArchiveDetailDTO {
  //   archiveId: number;
  //   title: string;
  //   companyName: string;
  //   resume: string;
  //   status: ArchiveStatus;
  //   questions: ArchiveQuestionItem[];
  // }

  useEffect(() => {
    resetChecked && setChecked(false);
    if (archive && selectAll) {
      setChecked(true);
      setSelectArchives((prev) => {
        return prev.some((item) => item.archiveId === archiveId)
          ? prev
          : [...prev, archive];
      });
    }
  }, [resetChecked, selectAll, setSelectArchives, archiveId]);

  const handleCheck = () => {
    !checked && archive
      ? setSelectArchives((prev) => [...prev, archive])
      : setSelectArchives((prev) => {
          return prev.filter((archive) => {
            if (archive.archiveId === archiveId) {
              return false;
            } else return true;
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
