'use client';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { ArchiveListItemDTO } from '@/entities/types';

import { useResumes } from '../../hooks';
import MyResumeSelection from '../practice-resume-selection';

interface ResumeSectionType {
  resume: ArchiveListItemDTO[];
  allResume: boolean;
  setAllResume: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  selectArchiveIds: number[];
  setSelectedArchiveIds: Dispatch<SetStateAction<number[]>>;
  focusedResume: number;
  setFocusedResume: Dispatch<SetStateAction<number>>;
}

export default function PracticeModalResumeSection({
  resume,
  allResume,
  setAllResume,
  reset,
  selectArchiveIds,
  setSelectedArchiveIds,
  focusedResume,
  setFocusedResume,
}: ResumeSectionType) {
  useEffect(() => {
    if (resume) {
      setFocusedResume(resume[0].archiveId);
      setSelectedArchiveIds([resume[0].archiveId]);
    }
  }, [resume]);
  return (
    <div className="flex  w-1/2 flex-col">
      <section className="flex h-12 w-full flex-row text-xs leading-5 text-gray-500">
        <div className="flex w-full flex-row items-center justify-between border border-gray-100 ">
          <div className="ml-[36px]">내 자기소개서</div>
          <div className="mr-[28px]">
            <button
              className="flex flex-row items-center gap-0.5"
              onClick={reset}
            >
              <Image
                src="/images/icons/icon-redo.svg"
                alt="redo-icon"
                width={24}
                height={24}
              />
              선택 초가화
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex h-[68px] w-full items-center border border-gray-100 pl-[24px] text-base">
          <label htmlFor={'resume'}>
            <Checkbox
              id="resumes"
              className="m-[10px] size-5 p-[2px] "
              checked={resume?.length === selectArchiveIds.length}
              onCheckedChange={(check: CheckedState) => {
                if (resume) {
                  check
                    ? (setAllResume(true),
                      setSelectedArchiveIds(
                        resume?.map((value) => value.archiveId),
                      ),
                      setFocusedResume(resume[resume.length - 1].archiveId))
                    : reset();
                }
              }}
            />
            내 자기소개서 전체
          </label>
        </div>
      </section>
      <section className="h-[300px] overflow-scroll">
        {resume &&
          resume.map((value: ArchiveListItemDTO) => {
            return (
              <MyResumeSelection
                key={value.archiveId}
                selectedArchiveIds={selectArchiveIds}
                setSelectArchiveIds={setSelectedArchiveIds}
                archiveId={value.archiveId}
                title={value.title}
                companyName={value.companyName}
                focusedResume={focusedResume}
                setFocusedResume={setFocusedResume}
              />
            );
          })}
      </section>
    </div>
  );
}
