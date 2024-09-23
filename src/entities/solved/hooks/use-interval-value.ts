import { useState } from 'react';

import { useInterval } from './use-interval';

export const useIntervalValue = (
  calculator: () => number,
  delay: number,
  refetch?: () => void,
) => {
  const [result, setResult] = useState(calculator());

  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
    if (newResult <= 0 && refetch) {
      refetch();
    }
  }, delay);

  return result;
};
