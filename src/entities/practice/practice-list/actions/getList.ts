'use server';

import { ArchiveDetailDTO, ArchiveListsDTO } from '@/entities/types';
import {
  PracticeQuestionListType,
  QuestionDetailType,
} from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getArchiveDetailedAction = async () => {
  // 첫 페이지의 데이터를 가져와 전체 페이지 수 확인
  const firstPageData = await backendApi<ArchiveListsDTO>({
    endpoint: API_ENDPOINT.archive.getArchives(0),
  });

  // 모든 페이지의 아카이브 데이터를 병렬로 가져오기
  const archivesPromises = Array.from(
    { length: firstPageData.totalPages },
    (_, index) =>
      backendApi<ArchiveListsDTO>({
        endpoint: API_ENDPOINT.archive.getArchives(index),
      }),
  );

  const rawArchives = await Promise.all(archivesPromises);

  // 모든 아카이브를 하나의 배열로 결합
  const archives = rawArchives.flatMap((archiveData) => archiveData.archives);

  // 모든 아카이브의 상세 정보를 병렬로 가져오기
  const archiveDetailPromises = archives.map((archive) =>
    backendApi<ArchiveDetailDTO>({
      endpoint: API_ENDPOINT.archive.getArchive(archive.archiveId),
    }),
  );

  const allArchiveDetails = await Promise.all(archiveDetailPromises);

  // 각 아카이브의 모든 질문의 상세 정보를 병렬로 가져오기
  const questionDetailPromises = allArchiveDetails.flatMap((archiveDetail) =>
    archiveDetail.questions.map((question) =>
      backendApi<QuestionDetailType>({
        endpoint: API_ENDPOINT.question.getQuestions(question.questionId),
      }).then((questionDetail) => ({
        ...questionDetail,
        questionId: question.questionId,
        archiveId: archiveDetail.archiveId,
        companyName: archiveDetail.companyName,
        title: archiveDetail.title,
      })),
    ),
  );

  const questionsCollection = await Promise.all(questionDetailPromises);

  return { questionsCollection };
};
