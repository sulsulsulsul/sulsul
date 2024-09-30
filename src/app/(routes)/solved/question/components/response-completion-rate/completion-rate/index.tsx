'use client';
import { useEffect, useState } from 'react';
import { LineProgressBar } from '@frogress/line';

const CompletionRate = () => {
  const [storedRate, setStoredRate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = sessionStorage.getItem('Response Completion Rate');
      setStoredRate(data ? data : '0');
    }
  }, []);

  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-base font-bold text-gray-800">답변 작성률 </p>
        <p className="text-base font-semibold text-gray-600">{storedRate}%</p>
      </div>
      <LineProgressBar percent={Number(storedRate)} rounded={36} height={8} />
    </div>
  );
};

export default CompletionRate;
