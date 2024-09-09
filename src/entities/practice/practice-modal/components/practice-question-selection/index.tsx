// 'use client';

// import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
// import { CheckedState } from '@radix-ui/react-checkbox';

// import { ModalQuestionType } from '@/entities/types/question';

// import { usePracticeQuestions } from '../../hooks/use-get-modal-questions';
// import PracticeModalQuestionItems from './question-modal-items';
// import { ArchiveDetailDTO } from '@/entities/types';

// interface QuestionDetail {
//   resetQuestion: boolean;
//   selectAll: CheckedState;
//   archiveId: number;
//   answerFilter: CheckedState;
//   hintFilter: CheckedState;
//   finalQuestions:ModalQuestionType[];
//   questions: ArchiveDetailDTO;
//   setFinalQuestions: Dispatch<SetStateAction<ModalQuestionType[]>>;
// }

// export default function QuestionSelection({
//   resetQuestion,
//   setFinalQuestions,
//   selectAll,
//   archiveId,
//   answerFilter,
//   hintFilter,
//   questions,
//   finalQuestions
// }: QuestionDetail) {

//   const handleFilter = useCallback(
//     (list: ModalQuestionType[]) => {
//       return list?.filter((item) => {
//         const answerCondition = !answerFilter || !item.isAnswered;
//         const hintCondition = !hintFilter || item.isHint;
//         return answerCondition && hintCondition;
//       });
//     },
//     [answerFilter, hintFilter],
//   );

//   const modifiedQuestionByFilter =
//     questions && (answerFilter || hintFilter)
//       ? handleFilter(questions!.questions.flat())
//       : questions?.questions;

//   useEffect(() => {
//     if (questions && (answerFilter || hintFilter)) {
//       setFinalQuestions((prev) => {
//         return handleFilter(prev);
//       });
//     }
//   }, [answerFilter, hintFilter]);

//   return (
//     <>
//       {modifiedQuestionByFilter &&
//         modifiedQuestionByFilter.map((value) => {
//           return (
//             <PracticeModalQuestionItems
//               key={value.questionId}
//               setFinalQuestions={setFinalQuestions}
//               questionProp={value}
//               resetQuestion={resetQuestion}
//               questionId={value.questionId}
//               selectAll={selectAll}
//             />
//           );
//         })}
//     </>
//   );
// }
