'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ChevronRight, MenuIcon } from 'lucide-react';

import { AuthSignedIn } from '@/components/auth/auth-signed-in';
import { AuthSignedOut } from '@/components/auth/auth-signed-out';
import { Logo } from '@/components/shared/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { APP_ROUTES } from '@/config/constants/app-routes';
import { MobileHeaderLinks } from '@/config/constants/navigation-links';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';
interface MobileHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const MobileHeader = ({ className, ...props }: MobileHeaderProps) => {
  const pathname = usePathname();
  const { data, image } = useUserStore();

  return (
    <header
      className={cn('flex h-full items-center justify-between py-4', className)}
      {...props}
    >
      <Link href={'/'}>
        <Logo />
      </Link>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex cursor-pointer justify-between bg-gradient-to-r from-[#576DFC] to-[#BEB6FF] p-6 text-left text-lg font-semibold text-white">
                      술술 시작하기
                      <ChevronRight />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <SignInView callbackUrl="/" />
                  </AlertDialogContent>
                </AlertDialog>
              </SheetClose>
            </AuthSignedOut>
          </div>
          <div>
            <AuthSignedIn>
              <SheetClose asChild>
                <Accordion type="single" collapsible className="w-full px-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-4">
                        <div className="relative size-11 overflow-hidden rounded-full bg-gray-100">
                          <Image
                            alt="프로필 이미지"
                            fill
                            src={image ? image : '/images/suri-profile.svg'}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-left text-lg font-semibold text-gray-900">
                            {data.nickname ?? 'no name'}
                          </span>
                          <span className="text-sm font-normal text-gray-600">
                            {data.email ?? 'no email'}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-8 text-sm font-semibold text-gray-600">
                      <Link
                        href={APP_ROUTES.my()}
                        className="mt-4 flex items-center gap-4"
                      >
                        <Image
                          width={24}
                          height={24}
                          src={'/images/icons/user.svg'}
                          alt=""
                        />
                        <span>마이페이지</span>
                      </Link>
                      <div
                        className="flex cursor-pointer items-center gap-4"
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                        }}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={'/images/icons/icon-logout.svg'}
                          alt=""
                        />
                        로그아웃
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SheetClose>
            </AuthSignedIn>
          </div>
          <div>
            {MobileHeaderLinks.map((link) => {
              const isEqual = pathname === link.link;
              const isActive = isEqual;
              const isPredictTab = link.label === '면접질문 예측';
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
                    <span className="relative w-full">
                      {link.label}
                      {isPredictTab && (
                        <div className="absolute -top-2 left-28 rounded-xl bg-blue-100 px-4 py-3">
                          <div className="text-center text-2xs text-blue-500">
                            <p>PC 버전에서 이용해주세요</p>
                          </div>
                          <div className="absolute left-0 top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue-100" />
                        </div>
                      )}
                    </span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
