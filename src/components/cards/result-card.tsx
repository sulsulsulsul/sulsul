import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
interface ResultCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  result: React.ReactNode
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
        'h-[215px] w-[282px] rounded-md bg-white p-[26px] shadow-base',
        className,
      )}
      {...props}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="">
          <h4 className="text-4xl font-bold">{result}</h4>
          <p className="text-base font-semibold text-gray-500">{title}</p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  )
}
