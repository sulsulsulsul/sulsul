'use server';
import { useArchives } from '@/entities/archives/hooks';
import { ArchiveDetailDTO, ArchiveListsDTO } from '@/entities/types';
import {
  PracticeQuestionListType,
  QuestionDetailType,
} from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getArchiveDetailedAction = async () => {
  const { totalPages } = await backendApi<ArchiveListsDTO>({
    endpoint: API_ENDPOINT.archive.getArchives(0),
  });

  //전체 아카이브 가져오기
  const archivesPromises = [];
  for (let i = 0; i >= totalPages; i++) {
    archivesPromises.push(
      backendApi<ArchiveListsDTO>({
        endpoint: API_ENDPOINT.archive.getArchives(i),
      }),
    );
  }

  const rawArchives = await Promise.all(archivesPromises);
  const archives = rawArchives.flatMap((value: ArchiveListsDTO) => {
    return value.archives;
  });

  //전체 아카이브에서 상세 가져오기
  const questionPromises = [];
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

    //필요한 정보 추가해서 저장 (archieId, questionId, company, title)
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

  //하나의 배열로 변환
  const questionsCollection = modifiedList.flatMap((value) => {
    return value.allQuestionsDetail;
  });

  return { questionsCollection: questionsCollection };
};
