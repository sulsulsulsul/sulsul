'use client';

import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import { Button } from '@/components/ui/button';
import { useArchives } from '@/entities/archives/hooks';
import { PracticedQuestionTabType } from '@/entities/dashboard/types';
import { usePracticeStore } from '@/store/practiceStore';

import { PracticedQuestionTab } from '../../dashboard/components/practice-question-tab';
import PracticeSectionHeader from '../../dashboard/components/practice-section-header';
import { QuestionDetailType } from '../../types/question';
import { useCreatePractice } from '../practice-modal/hooks';
import { FilterType, HintType, QuestionState } from '../types';
import PracticeListItem from './components/practice-list-item';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

export default function PracticeList() {
  //TODO  GET API FOR DATE AND COUNT FOR QUESTIONS
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionList, setSelectedQuestionList] = useState<
    QuestionDetailType[]
  >([]);

  const MAX_QEUSTION_COUNT = 6;

  // const modifiedByQuestionState = questions?.filter((value)=>{
  //   if(qstate === 'not_answer'){
  //     return value.practiceStatus === 'NOT_ANSWER'
  //   }else if(qstate === 'answer'){
  //     return  value.practiceStatus === 'ANSWER'
  //   }else return true
  // })
  // const {archives} = useArchives(0)
  const { questions } = usePracticeList();
  console.log(questions);

  const modifiedByHint = questions?.filter((value) => {
    return (
      (hint === 'on' && value.isHint) ||
      (hint === 'off' && !value.isHint) ||
      hint === 'default'
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [hint]);

  const { setStore } = usePracticeStore();
  const mutation = useCreatePractice();
  const router = useRouter();
  const pageIndex =
    questions && Math.ceil(modifiedByHint!.length / MAX_QEUSTION_COUNT);
  const handlePractice = async () => {
    await mutation.mutate(
      selectedQuestionList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          setStore({
            timer: true,
            practiceList: selectedQuestionList,
            practiceId: data,
          }),
            router.push('/practice/ing');
        },
      },
    );
  };

  return (
    <section className="flex w-[1200px] flex-col">
      <div className="mb-8 flex w-full flex-row justify-between">
        <div className="flex flex-col gap-3">
          <PracticeSectionHeader
            title="연습한 면접질문"
            iconSrc="/images/icons/etc-speech.svg"
          />
          <PracticedQuestionTab
            // onTabChange={}
            unansweredCount={20}
            hintUsedCount={10}
            favoriteCount={1}
          />
        </div>
        <Button
          className="mt-8 flex w-44 flex-row gap-1"
          variant="default"
          onClick={handlePractice}
        >
          다시 연습하기
          <Image
            src="/images/icons/icon-arrow_up_right.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </Button>
      </div>
      <PracticeListHeader setFilter={setFilter} setHint={setHint} />
      <div className="mb-[60px]  flex flex-col  gap-3 overflow-scroll">
        {modifiedByHint &&
          modifiedByHint.map((value, index) => {
            return (
              index + 1 <= MAX_QEUSTION_COUNT * currentPage &&
              index + 1 > MAX_QEUSTION_COUNT * (currentPage - 1) && (
                <PracticeListItem
                  key={value.questionId}
                  question={value}
                  setSelectQuestion={setSelectedQuestionList}
                />
              )
            );
          })}
      </div>
      <div className="fixed bottom-0 left-0 h-[60px] w-screen justify-center bg-gray-50 pt-3.5">
        <PaginationDemo
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={pageIndex!}
        />
      </div>
    </section>
  );
}
