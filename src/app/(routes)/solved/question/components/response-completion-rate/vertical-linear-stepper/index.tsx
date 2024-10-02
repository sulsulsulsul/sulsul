'use client';

import * as React from 'react';

import { MyChallengesProgressData } from '@/entities/types/challenges';

import { useUserChallengesProgress } from '../../../hook/use-user-challenges-progress';

// 각 카테고리에 대한 설명 및 타입 매핑
type CategoryInfo = {
  description: string;
  totalCount: number[];
};

const categoryInfo: Record<string, CategoryInfo> = {
  BASIC: { description: '최다 빈출 기본질문', totalCount: [10] },
  JOB: { description: '직무역량 & 경험', totalCount: [18, 18] },
  CULTURE: { description: '회사 로열티 & 컬쳐핏', totalCount: [19, 20] },
  VISION: { description: '가치관 & 비전', totalCount: [15] },
};

// category에 같은 글자가 포함된 항목들을 묶고 count를 배열로 받는 함수
const aggregateSteps = (steps: any) => {
  const aggregated: Record<
    string,
    {
      category: string;
      description: string;
      counts: number[];
      totalCount: number[];
    }
  > = {};

  steps.forEach(({ category, count }: any) => {
    // 카테고리의 키를 생성
    const key = category.replace(/_\d+$/, ''); // 숫자 부분 제거하여 그룹화

    if (!aggregated[key]) {
      aggregated[key] = {
        category: key,
        description: categoryInfo[key].description,
        counts: [],
        totalCount: categoryInfo[key].totalCount,
      };
    }

    // count 값을 배열에 추가
    aggregated[key].counts.push(count);
  });

  // 답변 작성률 sessionStorage 에 저장
  const totalCount = (steps || []).reduce(
    (sum: number, item: MyChallengesProgressData) => sum + item.count,
    0,
  );

  if (typeof window !== 'undefined') {
    sessionStorage.setItem('Response Completion Rate', totalCount);
  }

  // 결과를 배열로 변환
  return Object.values(aggregated);
};

const VerticalLinearStepper = ({
  data,
}: {
  data: MyChallengesProgressData;
}) => {
  const testDummyData = [
    { category: 'BASIC', count: 10, totalCount: 10 },
    { category: 'JOB_1', count: 8, totalCount: 18 },
    { category: 'JOB_2', count: 0, totalCount: 18 },
    { category: 'CULTURE_1', count: 0, totalCount: 19 },
    { category: 'CULTURE_2', count: 0, totalCount: 20 },
    { category: 'VISION', count: 0, totalCount: 15 },
  ];

  const steps = aggregateSteps(data);

  return (
    <div className="max-w-[400px]">
      {steps.map((step, index) => {
        const prevStep = steps[index - 1];
        return (
          <div key={step.category}>
            <div>
              <span
                className={`inline-block size-[12px] rounded-full ${
                  step.counts.some((count) => count > 0) ||
                  step.description === '최다 빈출 기본질문'
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              ></span>
              <span className="text-sx ml-[10px] font-semibold">
                {step.description}
              </span>
            </div>
            <div
              className={`h-auto max-w-[auto] ${
                steps.length - 1 === index ? '' : 'border-l'
              } ml-[5.5px] mt-[-7px] border-gray-200`}
            >
              {step.counts.map((count, idx) => {
                let showSubmitButton = false;

                // 1. 이전 스텝이 있는지 확인
                if (index > 0 && prevStep) {
                  // 1-1. 이전 스텝의 진행 단계가 1개이고 현재 스텝의 진행 단계가 1개 이상인 경우
                  // 1-1-1. 이전 스텝의 진행 단계의 버튼이 "작성완료" 일 경우
                  // 1-1-2. 현재 스텝의 첫번째 진행 단계 버튼을 "작성하기" 버튼으로 수정
                  if (
                    prevStep.counts.length === 1 &&
                    step.counts.length > 1 &&
                    idx === 0
                  ) {
                    if (prevStep.counts[0] === prevStep.totalCount[0]) {
                      showSubmitButton = true;
                    }
                  }

                  // 1-2. 이전 스텝의 진행 단계가 1개 이상이고 현재 스텝의 진행 단계도 1개 이상인 경우
                  // 1-2-1. 이전 스텝의 마지막 진행 단계의 버튼이 "작성완료"일 경우
                  // 1-2-2. 현재 스텝의 첫번째 진행 단계 버튼을 "작성하기" 버튼으로 수정
                  if (
                    prevStep.counts.length > 1 &&
                    step.counts.length > 1 &&
                    idx === 0
                  ) {
                    if (prevStep.counts[1] === prevStep.totalCount[1]) {
                      showSubmitButton = true;
                    }
                  }

                  // 1-3. 이전 스텝의 진행 단계가 1개 이상이고 현재 스텝의 진행 단계가 1개인 경우
                  // 1-3-1. 이전 스텝의 마지막 진행 단계가 "작성완료" 일 경우
                  // 1-3-2. 현재 스텝의 진행 단계 버튼을 "작성하기" 버튼으로 수정
                  if (prevStep.counts.length > 1 && step.counts.length === 1) {
                    if (prevStep.counts[1] === prevStep.totalCount[1]) {
                      showSubmitButton = true;
                    }
                  }
                }

                // 2. 현재 스텝이 1개 이상인 경우
                // 2-1. 첫번째 진행 단계 버튼이 "작성완료"일 경우
                // 2-2. 현재 스텝의 두번째 진행 단계 버튼을 "작성하기" 버튼으로 수정
                if (step.counts.length > 1 && idx === 1) {
                  if (step.counts[0] === step.totalCount[0]) {
                    showSubmitButton = true;
                  }
                }

                return (
                  <div
                    className={`flex justify-between ${
                      idx === 0
                        ? 'pb-[15px] pt-[16px]'
                        : idx === 1
                          ? 'pb-[30px]'
                          : ''
                    }`}
                    key={idx}
                  >
                    <p className="text-sx ml-[15px] whitespace-normal font-medium text-gray-500">
                      {count} / {step.totalCount[idx]}
                    </p>

                    {step.description === '최다 빈출 기본질문' &&
                    count !== step.totalCount[idx] ? (
                      <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-100 text-xs text-blue-500">
                        작성 중
                      </button>
                    ) : count === step.totalCount[idx] ? (
                      <button className="float-right h-[32px] w-[68px] rounded-sm bg-green-100 text-xs text-green-900 shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(163,226,206,1)]">
                        작성완료
                      </button>
                    ) : count > 0 && count !== step.totalCount[idx] ? (
                      <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-100 text-xs text-blue-500">
                        작성 중
                      </button>
                    ) : showSubmitButton ? (
                      <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-500 text-xs text-white shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(228,232,255,1)]">
                        작성하기
                      </button>
                    ) : (
                      <button className="float-right h-[32px] w-[68px] cursor-default rounded-sm bg-gray-100 text-xs text-gray-500">
                        작성 전
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default VerticalLinearStepper;
