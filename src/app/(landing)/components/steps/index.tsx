import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { DesktopSteps } from './desktop';
import { MobileSteps } from './mobile';
interface StepsProps extends HTMLAttributes<HTMLDivElement> {}

export const Steps = ({ className, ...props }: StepsProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div>
        <DesktopSteps className="hidden lg:block" />
        <MobileSteps className="block lg:hidden" />
      </div>
    </div>
  );
};
