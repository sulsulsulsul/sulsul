import { useEffect, useState } from 'react';
import { LineProgressBar } from '@frogress/line';

const CompletionRate = () => {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRate = sessionStorage.getItem('Response Completion Rate');
      setRate(storedRate ? Number(storedRate) : null);
    }
  }, []);

  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-base font-bold text-gray-800">답변 작성률 </p>
        <p className="text-base font-semibold text-gray-600">{rate}%</p>
      </div>
      <LineProgressBar percent={Number(rate)} rounded={36} height={8} />
    </div>
  );
};

export default CompletionRate;
