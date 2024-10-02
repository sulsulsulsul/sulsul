import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DesktopHeaderLinks } from '@/config/constants/navigation-links';
import { cn } from '@/lib/utils';
interface HeaderNavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const HeaderNavigation = ({
  className,
  ...props
}: HeaderNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {DesktopHeaderLinks.map((tab) => {
        let isActive;

        if (tab.link === '/archive') {
          isActive =
            pathname === '/archive' ||
            (pathname.startsWith('/archive/') &&
              !pathname.startsWith('/archive/create'));
        } else {
          isActive = pathname === tab.link;
        }
        return (
          <Link
            aria-label={isActive ? `active ${tab.label}` : tab.label}
            key={'desktop' + tab.link}
            className={cn(
              'text-gray-600 text-subhead2',
              'transition-colors',
              'hover:text-blue-500',
              {
                'text-blue-500': isActive,
              },
            )}
            href={tab.link}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
