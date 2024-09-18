import { LineProgressBar } from '@frogress/line';

const CompletionRate = () => {
  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-base font-bold text-gray-800">답변 작성률 </p>
        <p className="text-base font-semibold text-gray-600">20%</p>
      </div>
      <LineProgressBar percent={23} rounded={36} height={8} />
    </div>
  );
};

export default CompletionRate;
