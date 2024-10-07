'use client';

import * as React from 'react';

import { MyChallengesProgressData } from '@/entities/types/challenges';
import useQuestionTypeStore from '@/store/questionListTypeStore';

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
      counts: { category: string; count: number }[];
      totalCount: number[];
    }
  > = {};

  steps.forEach(({ category, count }: any) => {
    const key = category.replace(/_\d+$/, '');

    if (!aggregated[key]) {
      aggregated[key] = {
        category: key,
        description: categoryInfo[key].description,
        counts: [],
        totalCount: categoryInfo[key].totalCount,
      };
    }

    aggregated[key].counts.push({ category, count });
  });

  return Object.values(aggregated);
};

const VerticalLinearStepper = ({
  data,
}: {
  data: MyChallengesProgressData[];
}) => {
  const setSelectedCategory = useQuestionTypeStore(
    (state) => state.setSelectedCategory,
  );

  const steps = aggregateSteps(data);

  const handleClickButton = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="max-w-[400px]">
      {steps.map((step, index) => {
        const prevStep = steps[index - 1];
        return (
          <div key={step.category}>
            <div className=" mt-[-7px]">
              <span
                className={`inline-block size-[12px] rounded-full ${
                  step.counts.some((count) => count.count > 0) ||
                  step.description === '최다 빈출 기본질문'
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              ></span>
              <span className="ml-[10px] text-base font-semibold text-gray-700">
                {step.description}
              </span>
            </div>
            <div
              className={`h-auto max-w-[auto] ${
                steps.length - 1 === index ? '' : 'border-l'
              } ml-[5.5px] mt-[-7px] border-gray-200`}
            >
              {step.counts.map(({ category, count }, idx) => {
                let showSubmitButton = false;

                if (index > 0 && prevStep) {
                  if (
                    prevStep.counts.length === 1 &&
                    step.counts.length > 1 &&
                    idx === 0
                  ) {
                    if (prevStep.counts[0].count === prevStep.totalCount[0]) {
                      showSubmitButton = true;
                    }
                  }

                  if (
                    prevStep.counts.length > 1 &&
                    step.counts.length > 1 &&
                    idx === 0
                  ) {
                    if (prevStep.counts[1].count === prevStep.totalCount[1]) {
                      showSubmitButton = true;
                    }
                  }

                  if (prevStep.counts.length > 1 && step.counts.length === 1) {
                    if (prevStep.counts[1].count === prevStep.totalCount[1]) {
                      showSubmitButton = true;
                    }
                  }
                }

                if (step.counts.length > 1 && idx === 1) {
                  if (step.counts[0].count === step.totalCount[0]) {
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
                    <p className="ml-[15px] whitespace-normal text-base font-normal text-gray-500">
                      {count}/{step.totalCount[idx]}개
                    </p>

                    {step.description === '최다 빈출 기본질문' &&
                    count !== step.totalCount[idx] ? (
                      <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-100 text-sm leading-[32px] text-blue-500">
                        작성 중
                      </button>
                    ) : count === step.totalCount[idx] ? (
                      <button
                        className="float-right h-[32px] w-[68px] rounded-sm bg-green-100 text-sm leading-[32px] text-green-900 shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(163,226,206,1)]"
                        onClick={() => handleClickButton(category)}
                      >
                        작성완료
                      </button>
                    ) : count > 0 && count !== step.totalCount[idx] ? (
                      <button
                        className="float-right h-[32px] w-[68px] rounded-sm bg-blue-100 text-sm leading-[32px] text-blue-500"
                        onClick={() => handleClickButton(category)}
                      >
                        작성 중
                      </button>
                    ) : showSubmitButton ? (
                      <button
                        className="float-right h-[32px] w-[68px] rounded-sm bg-blue-500 text-sm leading-[32px] text-white shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(228,232,255,1)]"
                        onClick={() => handleClickButton(category)}
                      >
                        작성하기
                      </button>
                    ) : (
                      <button className="float-right h-[32px] w-[68px] cursor-default rounded-sm bg-gray-100 text-sm leading-[32px] text-gray-500">
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
