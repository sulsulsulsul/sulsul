import {
  getArchiveDetailAction,
  getArchiveListAction,
} from '@/entities/archives/actions';
import {
  ArchiveDetailDTO,
  ArchiveFeedback,
  ArchiveKeyword,
  ArchiveListItemDTO,
  ArchiveQuestionItem,
} from '@/entities/types';
import { faker } from '@/lib/faker';

export const mockGetArchiveDetailAction = async (): ReturnType<
  typeof getArchiveDetailAction
> => {
  faker.seed(123);
  return mockArchiveDetailDTO();
};

export const mockArchiveDetailDTO = (): ArchiveDetailDTO => ({
  title: faker.lorem.sentence(),
  companyName: faker.company.name(),
  archiveId: faker.number.int({
    min: 1,
    max: 100,
  }),
  status: 'COMPLETE',
  resume: faker.lorem.paragraph(30),
  questions: Array.from({ length: 10 }, () => mockArchiveQuestionItem()),
});

export const mockArchiveQuestionItem = (): ArchiveQuestionItem => ({
  questionId: faker.number.int(),
  content: faker.lorem.sentence(),
  isAnswered: faker.datatype.boolean(),
  answer: faker.lorem.paragraph(),
  keywords: Array.from({ length: 5 }, () => mockArchiveKeyword()),
  isHint: faker.datatype.boolean(),
});

export const mockArchiveKeyword = (): ArchiveKeyword => ({
  keywordId: faker.number.int(),
  content: faker.lorem.word(),
});

export const mockArchiveFeedback = (): ArchiveFeedback => ({
  feedbackId: 0,
  goodPoint: faker.lorem.paragraph(10),
  improvePoint: faker.lorem.paragraph(10),
  content: faker.lorem.paragraph(10),
});

export const mockGetArchiveListAction = async (): ReturnType<
  typeof getArchiveListAction
> => {
  faker.seed(123);
  return {
    totalCount: 4,
    totalPages: 1,
    archives: Array.from({ length: 10 }, () => mockArchiveListItemDTO()),
  };
};

export const mockArchiveListItemDTO = (): ArchiveListItemDTO => ({
  title: faker.lorem.sentence(),
  questionCount: faker.number.int({
    min: 0,
    max: 12,
  }),
  companyName: faker.company.name(),
  archiveId: faker.number.int({
    min: 1,
    max: 100,
  }),
  status: faker.helpers.arrayElement(['READY', 'COMPLETE', 'FAIL', 'CREATING']),
  answerCount: faker.number.int(),
  createdAt: faker.date.recent().toISOString(),
  modifiedAt: faker.date.recent().toISOString(),
});
