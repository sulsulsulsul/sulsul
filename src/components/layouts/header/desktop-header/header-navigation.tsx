import { DesktopHeaderLinks } from '@/config/constants/navigation-links'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'
interface HeaderNavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const HeaderNavigation = ({
  className,
  ...props
}: HeaderNavigationProps) => {
  const pathname = usePathname()

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {DesktopHeaderLinks.map((link) => {
        const isEqual = pathname === link.link
        const isActive = isEqual
        return (
          <Link
            aria-label={isActive ? `active ${link.label}` : link.label}
            key={'desktop' + link.link}
            className={cn(
              'text-gray-600 text-subhead2',
              'transition-colors',
              'hover:text-blue-500',
              {
                'text-blue-500': isActive,
              },
            )}
            href={link.link}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
