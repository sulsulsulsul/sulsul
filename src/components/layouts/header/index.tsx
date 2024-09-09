'use client';
import { HTMLAttributes } from 'react';

import { DesktopHeader } from './desktop-header';
import { HeaderAnimation } from './desktop-header/header-animation';
import { MobileHeader } from './mobile-header';
interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <HeaderAnimation className="fixed top-0 z-50 w-full">
      <div className="container h-[60px] mobile:h-[56px] mobile:px-6">
        <DesktopHeader className="flex mobile:hidden" />
        <MobileHeader className="hidden mobile:flex" />
      </div>
    </HeaderAnimation>
  );
};
