'use client';

import { HTMLAttributes } from 'react';

import { DesktopReason } from './desktop';
import { MobileReason } from './mobile';
interface ReasonProps extends HTMLAttributes<HTMLDivElement> {}

export const Reason = ({ className, ...props }: ReasonProps) => {
  return (
    <>
      <DesktopReason className="flex mobile:hidden" />
      <MobileReason className="hidden mobile:flex" />
    </>
  );
};
