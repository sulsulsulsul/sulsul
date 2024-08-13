export interface ArchiveDetailDTO {
  archiveId: number;
  title: string;
  companyName: string;
  resume: string;
  status: ArchiveStatus;
  questions: ArchiveQuestionItem[];
}
export interface ArchiveListItemDTO {
  title: string;
  archiveId: number;
  companyName: string;
  status: ArchiveStatus;
  questionCount: number;
  answerCount: number;
  createdAt: string;
  modifiedAt: string;
}

export interface ArchiveListsDTO {
  totalCount: number;
  totalPages: number;
  archives: ArchiveListItemDTO[];
}

export type ArchiveStatus = 'READY' | 'CREATING' | 'COMPLETE' | 'FAIL';
export type ArchiveFeedbackStatus = 'READY' | 'CREATING' | 'COMPLETE' | 'FAIL';

export interface ArchiveQuestionItem {
  isHint: boolean;
  questionId: number;
  content: string;
  isAnswered: boolean;
  answer: string;
  keywords: ArchiveKeyword[];
}

export interface ArchiveKeyword {
  keywordId: number;
  content: string;
}

export interface ArchiveFeedback {
  feedbackId: number;
  goodPoint: string;
  improvePoint: string;
  content: string;
}
