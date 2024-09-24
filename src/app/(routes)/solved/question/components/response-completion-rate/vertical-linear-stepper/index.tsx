import * as React from 'react';

const data = [
  { category: 'BASIC', count: 10 },
  { category: 'JOB_1', count: 10 },
  { category: 'JOB_2', count: 10 },
  { category: 'CULTURE_1', count: 0 },
  { category: 'CULTURE_2', count: 0 },
  { category: 'VISION', count: 0 },
];

// 각 카테고리에 대한 설명 및 타입 매핑
type CategoryInfo = {
  description: string;
};

const categoryInfo: Record<string, CategoryInfo> = {
  BASIC: { description: '최다 빈출 기본질문' },
  JOB: { description: '직무역량 & 경험' },
  CULTURE: { description: '회사 로열티 & 컬쳐핏' },
  VISION: { description: '가치관 & 비전' },
};

// category에 같은 글자가 포함된 항목들을 묶고 count를 배열로 받는 함수
const aggregateSteps = (steps: { category: string; count: number }[]) => {
  const aggregated: Record<
    string,
    {
      category: string;
      description: string;
      counts: number[];
    }
  > = {};

  steps.forEach(({ category, count }) => {
    // 카테고리의 키를 생성
    const key = category.replace(/_\d+$/, ''); // 숫자 부분 제거하여 그룹화

    if (!aggregated[key]) {
      aggregated[key] = {
        category: key,
        description: categoryInfo[key].description, // 설명 추가
        counts: [], // counts 배열 초기화
      };
    }

    // count 값을 배열에 추가
    aggregated[key].counts.push(count);
  });

  // 결과를 배열로 변환
  return Object.values(aggregated);
};

const steps = aggregateSteps(data);
console.log(steps);

const VerticalLinearStepper = () => {
  return (
    <div className="max-w-[400px]">
      {steps.map((step, stepIndex) => (
        <div key={step.category}>
          <div>
            <span
              className={`inline-block size-[12px] rounded-full ${step.counts.some((count) => count > 0) ? 'bg-blue-500' : 'bg-gray-300'} `}
            ></span>
            <span className="text-sx ml-[10px] font-semibold">
              {step.description}
            </span>
          </div>
          <div
            className={`h-auto max-w-[auto] ${steps.length - 1 === stepIndex ? '' : 'border-l'} ml-[5.5px] mt-[-7px] border-gray-200`}
          >
            {step.counts.map((count, countIndex) => (
              <div
                className={`flex justify-between ${countIndex === 0 ? 'pb-[15px] pt-[16px]' : stepIndex === 1 ? 'pb-[30px]' : ''}`}
                key={countIndex}
              >
                <p
                  key={countIndex}
                  className="text-sx ml-[15px] whitespace-normal font-medium text-gray-500"
                >
                  {count} / 10개
                </p>
                {count === 10 ? (
                  <button className="float-right h-[32px] w-[68px] rounded-sm bg-green-100 text-xs text-green-900 shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(163,226,206,1)]">
                    작성완료
                  </button>
                ) : count > 0 && count !== 10 ? (
                  <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-100 text-xs text-blue-500">
                    작성 중
                  </button>
                ) : // 조건 수정: counts의 길이가 1 이상일 때, 0번째 count가 10이면 "작성하기"
                // 조건 수정: counts의 length에 따라 버튼 표시
                stepIndex > 0 &&
                  ((step.counts.length === 1 &&
                    steps[stepIndex - 1].counts[
                      steps[stepIndex - 1].counts.length - 1
                    ] === 10) ||
                    (step.counts.length > 1 && step.counts[0] === 10)) ? (
                  <button className="float-right h-[32px] w-[68px] rounded-sm bg-blue-500 text-xs text-white shadow-[0_0_0_7px_rgba(255,255,255,1)] transition-all duration-300 hover:h-[32px] hover:w-[68px] hover:shadow-[0_0_0_7px_rgba(228,232,255,1)]">
                    작성하기
                  </button>
                ) : (
                  // 기본 "작성 전" 버튼
                  <button className="float-right h-[32px] w-[68px] rounded-sm bg-gray-100 text-xs text-gray-500">
                    작성 전
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default VerticalLinearStepper;
