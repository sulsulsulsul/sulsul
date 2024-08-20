import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className)} {...props}>
      Footer
    </footer>
  );
};
