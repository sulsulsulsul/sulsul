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

import { Loader } from '@/components/shared/loader';
import { cn } from '@/lib/utils';
import { usePracticeStore } from '@/store/practiceStore';

import { ArchiveDetailDTO, ArchiveListItemDTO } from '../../types/archive';
import { ModalQuestionType } from '../../types/question';
import ModalHeader from './components/modal-header';
import MyResumeSelection from './components/my-resume-selection';
import PracticeModalButton from './components/practice-modal-button';
import PracticeModalControl from './components/practice-modal-control';
import PracticeModalOption from './components/practice-modal-option';
import PracticeModalSelectAll from './components/practice-modal-selectAll';
import QuestionSelection from './components/practice-question-selection';
import { useCreatePractice } from './hooks/use-create-practice';
//import { useQuestions } from './hooks/use-get-questions';
import { useResumes } from './hooks/use-get-resumes';

interface PracticeSelectionProp {
  setModal: Dispatch<SetStateAction<boolean>>;
  //TODO: Get ResumeId on dashboard 다시하기 클릭
  //resumeId?: number;
}
export default function PracticeSelection({ setModal }: PracticeSelectionProp) {
  const router = useRouter();

  const { resume, isSuccess } = useResumes();

  const { setStore } = usePracticeStore();

  const [resetResume, setResetResume] = useState(false);

  const [resetQuestion, setResetQuestion] = useState(false);

  const [selectedArchiveList, setSelectedArchiveList] = useState<
    ArchiveDetailDTO[]
  >([]);

  // const [questionSelection, setQuestionSelection] = useState<
  //   ModalQuestionType[]
  // >([]);

  const [finalList, setFinalList] = useState<ModalQuestionType[]>([]);

  const [answerFilter, setAnswerFilter] = useState<CheckedState>(false);
  const [hintFilter, setHintFilter] = useState<CheckedState>(false);

  const [allResumes, setAllResumes] = useState<CheckedState>(false);
  const [allQuestions, setAllQuestions] = useState<CheckedState>(false);

  const [timer, setTimer] = useState<CheckedState>(false);
  const [random, setRandom] = useState<boolean>(false);

  const mutation = useCreatePractice();

  //선택된 아카이브 질문만 flat
  const questions = selectedArchiveList.flatMap((value) => {
    return value.questions;
  });

  // const { questions, refetch, isSuccess } = useQuestions(selectedArchiveList);
  //console.log(questions , selectedArchiveList)
  // const rawQuestionCollection = selectedArchiveList.flatMap((value) => {
  //   return value.questions;
  // });
  // const x = async () => {
  //   if(selectedArchiveList.length !== 0){
  //     const x = await getPracticeQuestion(selectedArchiveList);
  //     const flatted: QuestionDetailType[] = x.flat();
  //     setQuestionSelection(flatted);
  //   }
  // }
  // useEffect(() => {
  //   questions && setQuestionSelection(questions.flat());
  // }, [isSuccess]);

  useEffect(() => {
    setResetResume(false);
    !allResumes &&
      selectedArchiveList.length === resume?.length &&
      setAllResumes(true);

    allResumes &&
      selectedArchiveList.length !== resume?.length &&
      setAllResumes(false);

    if ((hintFilter || answerFilter) && allQuestions) {
      setFinalList(modifiedQuestionByFilter!);
    }
    finalList.length !== 0 &&
      modifiedQuestionByFilter!.length === finalList.length &&
      setAllQuestions(true);
  }, [selectedArchiveList.length, answerFilter, hintFilter]);

  //handle Filter
  const handleFilter = useCallback(
    (list: ModalQuestionType[]) => {
      return list?.filter((item) => {
        const answerCondition = !answerFilter || !item.isAnswered;
        const hintCondition = !hintFilter || item.isHint;
        return answerCondition && hintCondition;
      });
    },
    [answerFilter, hintFilter],
  );

  const modifiedQuestionByFilter =
    (questions && answerFilter) || hintFilter
      ? handleFilter(questions!.flat())
      : questions;

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

  const shuffledList = useMemo(() => {
    const newList = [...finalList];
    for (let i = finalList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  }, [finalList]);

  const handleSubmit = async () => {
    await mutation.mutate(
      finalList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          router.push('/practice/ing'),
            setStore({
              timer: !!timer,
              practiceList: random ? shuffledList : finalList,
              practiceId: data,
            });
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
            allitems={allResumes}
            reset={reset}
            description="내 자기소개서 전체"
          />
          <PracticeModalSelectAll
            sectionId="questions"
            reset={resetQuestionList}
            setAllitems={setAllQuestions}
            allitems={allQuestions}
            description="예상 문제 전체"
          />
        </section>
        <section className="flex flex-row">
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {isSuccess ? (
              resume &&
              resume.map((value: ArchiveListItemDTO) => {
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
              })
            ) : (
              <Loader />
            )}
          </div>
          <div className="flex h-[300px] w-1/2 flex-col overflow-scroll">
            {modifiedQuestionByFilter &&
              modifiedQuestionByFilter.map((value: ModalQuestionType) => {
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
