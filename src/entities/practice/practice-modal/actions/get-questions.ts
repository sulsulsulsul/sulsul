'use server';

import { ArchiveDetailDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getPracticeQuestion = async (id: number) => {
  // const questionDetailPromises = resumes.flatMap((resume) => {
  //   const { archiveId, title, companyName, questions } = resume;
  //   return questions.map((question) =>
  //     backendApi<QuestionDetailType>({
  //       endpoint: API_ENDPOINT.question.getQuestions(question.questionId),
  //     }).then((questionDetail) => ({
  //       ...questionDetail,
  //       archiveId,
  //       title,
  //       companyName,
  //       questionId: question.questionId,
  //       content: question.content,
  //     })),
  //   );
  // });
  // const modifiedQuestions = await Promise.all(questionDetailPromises);
  // return modifiedQuestions;
  // return backendApi<QuestionDetailType>({
  //         endpoint: API_ENDPOINT.question.getQuestions(question.questionId),
  // })
  return backendApi<ArchiveDetailDTO>({
    endpoint: API_ENDPOINT.archive.getArchive(id),
  });
};
