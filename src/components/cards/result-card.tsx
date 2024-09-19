import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface ResultCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  result: React.ReactNode;
}

export const ResultCard = ({
  className,
  title,
  icon,
  result,
  ...props
}: ResultCardProps) => {
  return (
    <div
      className={cn(
        'h-[215px] w-[282px] rounded-md bg-white p-[26px] shadow-base mobile:w-full mobile:h-[93px] mobile:py-[22.5px] flex flex-col justify-between mobile:items-center mobile:flex-row ',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        <h4 className="text-4xl font-bold mobile:text-2xl">{result}</h4>
        <p className="text-base font-semibold text-gray-500 mobile:text-xs">
          {title}
        </p>
      </div>
      <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
        {icon}
      </div>
    </div>
  );
};
