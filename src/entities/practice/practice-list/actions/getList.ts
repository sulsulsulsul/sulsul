'use server';
import { ArchiveDetailDTO, ArchiveListsDTO } from '@/entities/types';
import {
  PracticeQuestionListType,
  QuestionDetailType,
} from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getArchiveDetailedAction = async () => {
  //전체 아카이브 가져오기
  const { archives, totalCount, totalPages } =
    await backendApi<ArchiveListsDTO>({
      endpoint: API_ENDPOINT.archive.getArchives(0),
    });
  const questionPromises = [];
  //전체 아카이브에서 상세 가져오기
  for (let i of archives) {
    questionPromises.push(
      backendApi<ArchiveDetailDTO>({
        endpoint: API_ENDPOINT.archive.getArchive(i.archiveId),
      }),
    );
  }
  //전체 아카이브 상세 결과 값
  const allQuestions = await Promise.all(questionPromises);
  let questionDetailPromises = [];
  const modifiedList: PracticeQuestionListType[] = [];
  for (let i of allQuestions) {
    for (let j of i.questions) {
      questionDetailPromises.push(
        backendApi<QuestionDetailType>({
          endpoint: API_ENDPOINT.question.getQuestions(j.questionId),
        }),
      );
    }
    const allQuestionsDetail = await Promise.all(questionDetailPromises);
    const newAlllQuestionDetail = allQuestionsDetail.map((value, index) => {
      return {
        ...value,
        questionId: i.questions[index].questionId,
        archiveId: i.archiveId,
        companyName: i.companyName,
        title: i.title,
      };
    });
    const collect = { ...i, allQuestionsDetail: newAlllQuestionDetail };
    modifiedList.push(collect);
    questionDetailPromises = [];
  }
  const questionsCollection = modifiedList.flatMap((value) => {
    return value.allQuestionsDetail;
  });

  return { questionsCollection: questionsCollection };
};
