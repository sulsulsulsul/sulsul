'use client';

import { useState } from 'react';

import { ArchiveDetailDTO } from '../types';
import {
  PracticeQuestionListType,
  QuestionDetailType,
} from '../types/question';
import PracticeListItem from './components/practice-list-item';
import PracticeListPagination from './components/practice-list-pagination';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

export type FilterType = 'recent' | 'old' | 'mostCount' | 'leastCount';
export type HintType = 'on' | 'off' | 'default';

interface ReesultPracticeList extends ArchiveDetailDTO {
  allQuestions: QuestionDetailType[];
}

export default function PracticeList() {
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const MAX_QEUSTION_COUNT = 6;

  const { list } = usePracticeList();

  let listCount: number = 0;
  list &&
    list.forEach((v, i) => {
      return (listCount += v.allQuestionsDetail.length);
    });
  const pageIndex = Math.ceil(listCount / MAX_QEUSTION_COUNT);
  console.log(listCount, pageIndex);

  return (
    <section className="flex w-[1200px] flex-col gap-3">
      <PracticeListHeader setFilter={setFilter} setHint={setHint} />
      {list &&
        list.map((resumeValue: PracticeQuestionListType) => {
          return resumeValue!.allQuestionsDetail!.map((itemValue: any) => {
            if (
              (hint === 'on' && itemValue.isHint) ||
              (hint === 'off' && !itemValue.isHint) ||
              hint === 'default'
            ) {
              return (
                <PracticeListItem
                  key={itemValue.questionId}
                  archiveId={resumeValue.archiveId}
                  title={resumeValue.title}
                  content={itemValue.content}
                  companyName={resumeValue.companyName}
                  isStar={itemValue.isStar}
                  isHint={itemValue.isHint}
                  questionId={0}
                  practiceCount={itemValue.practiceCount}
                  practiceTime={itemValue.practiceTime}
                />
              );
            } else <>Nothing</>;
          });
        })}
      <PracticeListPagination
        isActive={false}
        currentPage={currentPage}
        pages={pageIndex}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
