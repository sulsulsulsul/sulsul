import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface LandingProps extends HTMLAttributes<HTMLDivElement> {}

export const Landing = ({ className, ...props }: LandingProps) => {
  return (
    <div className={cn(className)} {...props}>
      Landing
    </div>
  );
};
