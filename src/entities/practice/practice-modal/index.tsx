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

import { ModalQuestionType, PracticingListType } from '../../types/question';
import { usePracticeDetail } from '../hooks/use-get-practice-detail';
import ModalHeader from './components/modal-header';
import PracticeModalButton from './components/practice-modal-button';
import PracticeModalOption from './components/practice-modal-option';
import PracticeModalQuestionSection from './components/practice-modal-question-section';
import PracticeModalResumeSection from './components/practice-modal-resume-section';
import { useCreatePractice } from './hooks/use-create-practice';

interface PracticeSelectionProp {
  setModal: Dispatch<SetStateAction<boolean>>;
  //TODO: Get ResumeId on dashboard 다시하기 클릭
  //resumeId?: number;
}
export default function PracticeSelection({ setModal }: PracticeSelectionProp) {
  const router = useRouter();

  const { setStore } = usePracticeStore();

  const [resetResume, setResetResume] = useState(false);

  const [resetQuestion, setResetQuestion] = useState(false);

  const [selectedArchiveIds, setSelectedArchiveIds] = useState<number[]>([]);

  const [finalList, setFinalList] = useState<ModalQuestionType[]>([]);

  const [answerFilter, setAnswerFilter] = useState<CheckedState>(false);
  const [hintFilter, setHintFilter] = useState<CheckedState>(false);

  const [allResumes, setAllResumes] = useState<CheckedState>(false);
  const [allQuestions, setAllQuestions] = useState<CheckedState>(false);

  const [timer, setTimer] = useState<CheckedState>(false);
  const [random, setRandom] = useState<boolean>(false);

  const mutation = useCreatePractice();

  useEffect(() => {
    setResetResume(false);
  }, [selectedArchiveIds, answerFilter, hintFilter]);

  const reset = useCallback(() => {
    setResetResume(true);
    setAllQuestions(false);
    setAllResumes(false);
    setSelectedArchiveIds([]);
  }, []);

  const resetQuestionList = useCallback(() => {
    setResetQuestion(true);
    setAllQuestions(false);
    setAnswerFilter(false);
    setHintFilter(false);
    setFinalList([]);
  }, []);

  const shuffledList = useMemo(() => {
    const newList = [...finalList];
    for (let i = finalList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  }, [finalList]);

  const detailedQuestionsIds = random
    ? shuffledList.flatMap((value) => {
        return value.questionId;
      })
    : finalList.flatMap((value) => {
        return value.questionId;
      });

  const { data, refetch } = usePracticeDetail(detailedQuestionsIds);

  const handleSubmit = async () => {
    await refetch();
    await mutation.mutate(
      finalList.flatMap((value) => value.questionId),
      {
        onSuccess: (value) => {
          router.push('/practice/ing'),
            setStore({
              timer: !!timer,
              practiceList: data as PracticingListType[],
              practiceId: value,
            });
        },
      },
    );
  };

  return (
    <>
      <div
        className={cn(
          'fixed flex  w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
        )}
      >
        <div className="flex w-[75rem] flex-col rounded-md border border-gray-100 bg-white">
          <ModalHeader />
          <div className="flex w-full flex-row">
            <PracticeModalResumeSection
              reset={reset}
              selectArchiveIds={selectedArchiveIds}
              setSelectedArchiveIds={setSelectedArchiveIds}
              allResumes={allResumes}
              setAllResumes={setAllResumes}
              resetResume={resetResume}
              setResetResume={setResetResume}
            />
            <PracticeModalQuestionSection
              selectedArchiveIds={selectedArchiveIds}
              resetQuestion={resetQuestion}
              setFinalList={setFinalList}
              resetQuestionList={resetQuestionList}
              allQuestions={allQuestions}
              setAllQuestions={setAllQuestions}
              answerFilter={answerFilter}
              setAnswerFilter={setAnswerFilter}
              hintFilter={hintFilter}
              setHintFilter={setHintFilter}
            />
          </div>
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
    </>
  );
}
