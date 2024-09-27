import { LineProgressBar } from '@frogress/line';

const CompletionRate = () => {
  const Rate = sessionStorage.getItem('Response Completion Rate');
  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-base font-bold text-gray-800">답변 작성률 </p>
        <p className="text-base font-semibold text-gray-600">{Rate}%</p>
      </div>
      <LineProgressBar percent={Number(Rate)} rounded={36} height={8} />
    </div>
  );
};

export default CompletionRate;
