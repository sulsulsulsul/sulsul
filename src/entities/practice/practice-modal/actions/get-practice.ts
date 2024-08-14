'use server';

import { ArchiveDetailDTO, ArchiveQuestionItem } from '@/entities/types';
import { QuestionDetailType } from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getPracticeQuestion = async (archives: ArchiveDetailDTO[]) => {
  const modifiedQuestions = [];
  for (let j of archives) {
    const { archiveId, title, companyName, questions } = j;
    const questionPromises = [];
    for (let i of questions) {
      const x = await backendApi<QuestionDetailType>({
        endpoint: API_ENDPOINT.question.getQuestions(i.questionId),
      });
      questionPromises.push({
        ...x,
        archiveId: archiveId,
        title: title,
        companyName: companyName,
        questionId: i.questionId,
        content: i.content,
      });
    }
    let collection = await Promise.all(questionPromises);
    modifiedQuestions.push(collection);
  }
  return modifiedQuestions;
};
