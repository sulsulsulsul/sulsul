'use client';

import { useState } from 'react';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';

import PracticeListItem from './components/practice-list-item';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

export type FilterType = 'recent' | 'old' | 'mostCount' | 'leastCount';
export type HintType = 'on' | 'off' | 'default';

export default function PracticeList() {
  //TODO  GET API FOR DATE AND COUNT FOR QUESTIONS
  const [filter, setFilter] = useState<FilterType>('recent');

  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const MAX_QEUSTION_COUNT = 6;
  const { questions } = usePracticeList();
  const modifiedQuestionList = questions?.filter((value) => {
    return (
      (hint === 'on' && value.isHint) ||
      (hint === 'off' && !value.isHint) ||
      hint === 'default'
    );
  });
  const pageIndex =
    questions && Math.ceil(modifiedQuestionList!.length / MAX_QEUSTION_COUNT);
  return (
    <section className="flex w-[1200px] flex-col gap-3">
      <PracticeListHeader setFilter={setFilter} setHint={setHint} />
      {modifiedQuestionList &&
        modifiedQuestionList.map((value, index) => {
          return (
            index + 1 <= MAX_QEUSTION_COUNT * currentPage &&
            index + 1 > MAX_QEUSTION_COUNT * (currentPage - 1) && (
              <PracticeListItem
                key={value.questionId}
                archiveId={value.archiveId}
                title={value.title}
                content={value.content}
                companyName={value.companyName}
                isStar={value.isStar}
                isHint={value.isHint}
                questionId={value.questionId}
                practiceCount={value.practiceCount}
                practiceTime={value.practiceTime}
              />
            )
          );
        })}
      <PaginationDemo
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={pageIndex!}
      />
    </section>
  );
}
