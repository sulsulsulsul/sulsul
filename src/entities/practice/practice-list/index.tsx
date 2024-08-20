'use client';

import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import { Button } from '@/components/ui/button';
import { useArchives } from '@/entities/archives/hooks';
import { PracticedQuestionTabType } from '@/entities/dashboard/types';
import {
  usePracticeResultStore,
  usePracticeStore,
} from '@/store/practiceStore';

import { PracticedQuestionTab } from '../../dashboard/components/practice-question-tab';
import PracticeSectionHeader from '../../dashboard/components/practice-section-header';
import { QuestionDetailType } from '../../types/question';
import { useCreatePractice } from '../practice-modal/hooks';
import { FilterType, HintType, QuestionState } from '../types';
import PracticeListItem from './components/practice-list-item';
import { PracticeListTab } from './components/practice-list-tab';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

export default function PracticeList({ qstate }: { qstate: QuestionState }) {
  //TODO: Change the qstate to something good name
  //TODO  GET API FOR DATE AND COUNT FOR QUESTIONS
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionList, setSelectedQuestionList] = useState<
    QuestionDetailType[]
  >([]);

  const MAX_QEUSTION_COUNT = 6;
  const [tabChange, setTabChange] = useState<QuestionState>('all');

  // const {archives} = useArchives(0)
  // const { questions } = usePracticeList();

  //TODO: remove mock
  const questions: QuestionDetailType[] = [
    {
      archiveId: 0,
      title: 'asdsads',
      companyName: 'asdadad',
      questionId: 0,
      content: 'sadadsad',
      answer: 'asdadsa',
      isAnswered: true,
      isStar: true,
      isHint: true,
      practiceCount: 40,
      practiceTime: 10,
      lastPracticeAt: '2024-08-16T13:49:45.921Z',
      // 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
      practiceStatus: 'ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: 'dsada',
        improvePoint: 'sadasd',
        content: 'sadas',
        status: 'READY', //Ask
      },
      keywords: [
        {
          keywordId: 0,
          content: 'keyword',
        },
      ],
    },
    {
      archiveId: 1,
      title: '1',
      companyName: '1',
      questionId: 1,
      content: '1',
      answer: '1',
      isAnswered: false,
      isStar: false,
      isHint: false,
      practiceCount: 30,
      practiceTime: 20,
      lastPracticeAt: '2024-06-16T13:49:45.921Z',
      // 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
      practiceStatus: 'ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: 'dsada',
        improvePoint: 'sadasd',
        content: 'sadas',
        status: 'READY', //Ask
      },
      keywords: [
        {
          keywordId: 0,
          content: 'keyword',
        },
      ],
    },
    {
      archiveId: 2,
      title: '2',
      companyName: '2',
      questionId: 2,
      content: '2',
      answer: '2',
      isAnswered: false,
      isStar: false,
      isHint: true,
      practiceCount: 20,
      practiceTime: 30,
      lastPracticeAt: '2024-04-16T13:49:45.921Z',
      // 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
      practiceStatus: 'NOT_ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: 'dsada',
        improvePoint: 'sadasd',
        content: 'sadas',
        status: 'READY', //Ask
      },
      keywords: [
        {
          keywordId: 0,
          content: 'keyword',
        },
      ],
    },
    {
      archiveId: 3,
      title: '3',
      companyName: '3',
      questionId: 3,
      content: '3',
      answer: '3',
      isAnswered: true,
      isStar: false,
      isHint: false,
      practiceCount: 10,
      practiceTime: 40,
      lastPracticeAt: '2024-01-16T13:49:45.921Z',
      // 'NOT_PRACTICE' | 'ANSWER' | 'NOT_ANSWER';
      practiceStatus: 'NOT_ANSWER',
      feedback: {
        feedbackId: 0,
        goodPoint: 'dsada',
        improvePoint: 'sadasd',
        content: 'sadas',
        status: 'READY', //Ask
      },
      keywords: [
        {
          keywordId: 0,
          content: 'keyword',
        },
      ],
    },
  ];

  const modifiedByQuestionState = questions?.filter((value) => {
    console.log(tabChange === 'not_answer', tabChange, typeof tabChange);
    if (tabChange === 'not_answer') {
      console.log('a');
      return value.practiceStatus === 'NOT_ANSWER';
    } else if (tabChange == 'answer') {
      console.log('b');
      return value.practiceStatus === 'ANSWER';
    } else return true;
  });

  const modifiedByHint = modifiedByQuestionState?.filter((value) => {
    return (
      (hint === 'on' && value.isHint) ||
      (hint === 'off' && !value.isHint) ||
      hint === 'default'
    );
  });

  const handleSortByFilter = (value: QuestionDetailType[]) => {
    if (filter === 'recent') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return (
          new Date(b.lastPracticeAt).valueOf() -
          new Date(a.lastPracticeAt).valueOf()
        );
      });
    } else if (filter === 'old') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return (
          new Date(a.lastPracticeAt).valueOf() -
          new Date(b.lastPracticeAt).valueOf()
        );
      });
    } else if (filter === 'leastCount') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return a.practiceCount - b.practiceCount;
      });
    } else if (filter === 'mostCount') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return b.practiceCount - a.practiceCount;
      });
    }
  };

  const modifiedByFilter = handleSortByFilter(modifiedByHint);
  // console.log(modifiedByFilter , tabChange)
  useEffect(() => {
    setCurrentPage(1);
  }, [hint, tabChange]);

  //mock correct , incorrect
  // const {  correct, incorrect}=usePracticeResultStore()
  const correct = ['', ''];
  const incorrect = ['', ''];

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
          <PracticeListTab
            onTabChange={setTabChange}
            allCount={correct.length + incorrect.length}
            unansweredCount={incorrect.length}
            answeredCount={correct.length}
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
        {modifiedByFilter &&
          modifiedByFilter.map((value, index) => {
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
