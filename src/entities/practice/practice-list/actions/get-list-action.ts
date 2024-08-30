'use server';

import {
  PracticeQuestionListType,
  QuestionSearchType,
  SearchParam,
} from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getSearchQuestions = (props: SearchParam) => {
  let query: string[] = [];
  if (props.userId) {
    query.push(`userId=${props.userId}`);
  }
  if (props.practiceStatus && props.practiceStatus.toUpperCase() !== 'ALL') {
    query.push(`practiceStatus=${props.practiceStatus.toUpperCase()}`);
  }
  if (props.hint && props.hint !== 'default') {
    query.push(`hint=${props.hint === 'on'}`);
  }
  // if(props.star){
  //   query.push( `star=${props.star}`)
  // }
  if (props.page) {
    query.push(`page=${props.page}`);
  }
  if (props.size) {
    query.push(`size=${props.size}`);
  }
  return backendApi<PracticeQuestionListType>({
    endpoint: API_ENDPOINT.question.getSearchQuestions(query.join('&')),
  });
};
