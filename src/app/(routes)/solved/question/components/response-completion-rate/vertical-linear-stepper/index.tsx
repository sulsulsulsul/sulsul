import * as React from 'react';

const steps = [
  {
    label: '최다 빈출 기본질문',
    description: ['2/10개'],
  },
  {
    label: '직무역량 & 경험',
    description: ['0/18개', '0/18개'],
  },
  {
    label: '회사 로열티 & 컬쳐핏',
    description: ['0/19개', '0/20개'],
  },
  {
    label: '가치관 & 비전',
    description: ['0/15개'],
  },
];

const VerticalLinearStepper = () => {
  return (
    <div className="max-w-[400px]">
      {steps.map((step, index) => (
        <div key={step.label}>
          <div>
            <span className="inline-block size-[12px] rounded-full bg-blue-500"></span>
            <span className="text-sx ml-[10px] font-semibold">
              {step.label}
            </span>
          </div>
          <div
            className={`h-auto max-w-[auto] ${steps.length - 1 === index ? '' : 'border-l'} ml-[5.5px] mt-[-7px] border-gray-200`}
          >
            {step.description.map((des, index) => (
              <div
                className={`flex justify-between ${index === 0 ? 'pb-[15px] pt-[16px]' : index === 1 ? 'pb-[30px]' : ''}`}
                key={index}
              >
                <p
                  key={index}
                  className="text-sx ml-[15px] whitespace-normal font-medium text-gray-500"
                >
                  {des}
                </p>
                <button className="float-right h-[25px] w-[60px] rounded-sm bg-green-100 text-xs text-green-900">
                  작성완료
                </button>
                {/* <button className="float-right bg-blue-500 text-xs text-white w-[60px] h-[25px] rounded-sm">
                  작성하기
                </button>
                <button className="float-right bg-gray-100 text-xs text-gray-500 w-[60px] h-[25px] rounded-sm">
                  작성 전
                </button> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default VerticalLinearStepper;
