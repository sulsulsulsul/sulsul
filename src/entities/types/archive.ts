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
  id: number;
  content: string;
  isAnswered: boolean;
  answer: string;
  keywords: ArchiveKeyword[];
}

export interface ArchiveKeyword {
  id: number;
  content: string;
}

export interface ArchiveFeedback {
  feedbackId: 0;
  content: string;
  status: ArchiveFeedbackStatus;
}
