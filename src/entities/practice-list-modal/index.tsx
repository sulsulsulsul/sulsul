'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import { usePracticeStore } from '@/store/practiceStore';

import { useArchives } from '../archives/hooks';
import {
  ArchiveDetailDTO,
  ArchiveListItemDTO,
  ArchiveQuestionItem,
} from '../types/archive';
import ModalHeader from './components/modal-header';
import MyResumeSelection from './components/my-resume-selection';
import PracticeModalButton from './components/practice-modal-button';
import PracticeModalControl from './components/practice-modal-control';
import PracticeModalOption from './components/practice-modal-option';
import PracticeModalSelectAll from './components/practice-modal-selectAll';
import QuestionSelection from './components/practice-question-selection';
import { useCreatePractice } from './hooks/use-create-practice';

interface PracticeSelectionProp {
  setModal: Dispatch<SetStateAction<boolean>>;
  //다시 하기 눌렀을떄 해당 resume 체크
  resumeId?: number;
}

//TODO: clean up  annotation
export default function PracticeSelection({
  setModal,
  resumeId,
}: PracticeSelectionProp) {
  const router = useRouter();

  const { archives } = useArchives(0);
  const archiveList = archives?.archives;

  const { setStore } = usePracticeStore();

  const [resetResume, setResetResume] = useState(false);

  const [resetQuestion, setResetQuestion] = useState(false);

  const [selectedArchiveList, setSelectedArchiveList] = useState<
    ArchiveDetailDTO[]
  >([]);

  const [finalList, setFinalList] = useState<ArchiveQuestionItem[]>([]);

  const [answerFilter, setAnswerFilter] = useState<CheckedState>(false);
  const [hintFilter, setHintFilter] = useState<CheckedState>(false);

  const [allResumes, setAllResumes] = useState<CheckedState>(false);
  const [allQuestions, setAllQuestions] = useState<CheckedState>(false);

  const [timer, setTimer] = useState<CheckedState>(false);
  const [random, setRandom] = useState<boolean>(false);

  const mutation = useCreatePractice();

  const shuffledList = useMemo(() => {
    const newList = [...finalList];
    for (let i = finalList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  }, [finalList]);

  const questionCollection = selectedArchiveList.flatMap((value) => {
    return value.questions;
  });
  const filteredList =
    answerFilter || hintFilter
      ? questionCollection.filter((item) => {
          const answerCondition = !answerFilter || !item.isAnswered;
          const hintCondition = !hintFilter || item.isHint;
          return answerCondition && hintCondition;
        })
      : [];
  const reset = useCallback(() => {
    setResetResume(true);
    setAllQuestions(false);
    setAllResumes(false);
    setSelectedArchiveList([]);
  }, []);
  const resetQuestionList = useCallback(() => {
    setResetQuestion(true);
    setAllQuestions(false);
    setAnswerFilter(false);
    setHintFilter(false);
    setFinalList([]);
  }, []);

  //TODO: State interaction with item click and all click
  useEffect(() => {
    selectedArchiveList.length === archiveList?.length && setAllResumes(true);
  }, [archiveList?.length, selectedArchiveList]);

  const handleSubmit = async () => {
    await mutation.mutate(
      finalList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          setStore({
            timer: !!timer,
            practiceList: random ? shuffledList : finalList,
            practiceId: data,
          }),
            router.push('/practice/ing');
        },
      },
    );
  };

  return (
    <div
      className={cn(
        'fixed flex  w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
      )}
    >
      <div className="flex w-[75rem] flex-col rounded-md border border-gray-100 bg-white">
        <ModalHeader />
        <PracticeModalControl
          reset={reset}
          setAnswerFilter={setAnswerFilter}
          answerFilter={answerFilter}
          setHintFilter={setHintFilter}
          hintFilter={hintFilter}
          resetQuestionList={resetQuestionList}
        />
        <section className="flex w-full flex-row">
          <PracticeModalSelectAll
            sectionId="resumes"
            setAllitems={setAllResumes}
            reset={reset}
            allitems={allResumes}
            description="내 자기소개서 전체"
          />
          <PracticeModalSelectAll
            sectionId="questions"
            setAllitems={setAllQuestions}
            reset={resetQuestionList}
            allitems={allQuestions}
            description="예상 문제 전체"
          />
        </section>
        <section className="flex flex-row">
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {archiveList &&
              archiveList.map((value: ArchiveListItemDTO) => {
                return (
                  <MyResumeSelection
                    key={value.archiveId}
                    resetChecked={resetResume}
                    setSelectArchives={setSelectedArchiveList}
                    selectAll={allResumes}
                    archiveId={value.archiveId}
                    title={value.title}
                    companyName={value.companyName}
                  />
                );
              })}
          </div>
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {hintFilter || answerFilter || filteredList.length !== 0
              ? filteredList.map((value: ArchiveQuestionItem) => {
                  return (
                    <QuestionSelection
                      key={value.questionId}
                      questionProp={value}
                      questionId={value.questionId}
                      resetQuestion={resetQuestion}
                      setFinalQuestions={setFinalList}
                      selectAll={allQuestions}
                    />
                  );
                })
              : questionCollection.map((value: ArchiveQuestionItem) => {
                  return (
                    <QuestionSelection
                      key={value.questionId}
                      questionProp={value}
                      questionId={value.questionId}
                      resetQuestion={resetQuestion}
                      setFinalQuestions={setFinalList}
                      selectAll={allQuestions}
                    />
                  );
                })}
          </div>
        </section>
        <section>
          <PracticeModalOption
            random={random}
            setRandom={setRandom}
            setTimer={setTimer}
          />
          <PracticeModalButton
            listCount={finalList.length}
            setCancel={setModal}
            handleSubmit={handleSubmit}
            setDisable={finalList.length === 0}
          />
        </section>
      </div>
    </div>
  );
}
