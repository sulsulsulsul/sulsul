'use client'

import { HTMLAttributes } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, MenuIcon } from 'lucide-react'

import { AuthSignedOut } from '@/components/auth/auth-signed-out'
import { Logo } from '@/components/shared/logo'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MobileHeaderLinks } from '@/config/constants/navigation-links'
import { cn } from '@/lib/utils'
interface MobileHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const MobileHeader = ({ className, ...props }: MobileHeaderProps) => {
  const pathname = usePathname()

  return (
    <header
      className={cn('flex h-full items-center justify-between', className)}
      {...props}
    >
      <Logo />
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="w-screen p-0">
          <SheetHeader className="p-5">
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div>
            <AuthSignedOut>
              <SheetClose asChild>
                <Link
                  // linear gradient left to right
                  className="flex justify-between bg-gradient-to-r from-[#576DFC] to-[#BEB6FF] p-5 text-left text-lg font-semibold text-white"
                  href={'/auth/sign-in'}
                >
                  <span>술술 시작하기</span>
                  <ChevronRight />
                </Link>
              </SheetClose>
            </AuthSignedOut>
          </div>
          <div>
            {MobileHeaderLinks.map((link) => {
              const isEqual = pathname === link.link
              const isActive = isEqual
              return (
                <SheetClose asChild key={'mobile' + link.link}>
                  <Link
                    aria-label={isActive ? `active ${link.label}` : link.label}
                    className={cn(
                      'flex p-5',
                      'text-lg font-semibold',
                      'transition-colors',
                      {
                        'text-blue-500': isActive,
                      },
                    )}
                    href={link.link}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
