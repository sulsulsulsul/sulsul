export interface FeedbackDTO {
  feedbackId: number;
  content: string;
  status: 'READY';
}

export type FeedbackStatus = 'READY' | 'CREATING' | 'COMPLETE' | 'FAIL';
