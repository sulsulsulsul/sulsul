import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LandingFooterLinks } from '@/config/constants/navigation-links';
import { cn } from '@/lib/utils';
interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <div className={cn('container', className)} {...props}>
      <div
        className={cn(
          'flex flex-col sm:flex-row p-8 border-b gap-10 justify-center items-center',
          className,
        )}
        {...props}
      >
        {LandingFooterLinks.map((link) => {
          return (
            <Link
              key={'footer' + link.link}
              className={cn(
                'text-[#3E404B] text-base sm:text-lg font-semibold',
                'transition-colors',
                'hover:text-blue-500',
              )}
              href={link.link}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-between py-6">
        <Image
          alt="logo"
          src="/images/footer-logo.svg"
          width={92}
          height={22}
        />
        <p className="text-lg font-medium text-[#3E404B] opacity-50">
          © 2024 Sulsul. All rights reserved.
        </p>
      </div>
    </div>
  );
};
