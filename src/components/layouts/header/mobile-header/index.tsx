'use client';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ChevronLeft, ChevronRight, MenuIcon } from 'lucide-react';

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
import { Button } from '@/components/ui/button';
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
  const copiedLink = 'https://sulsul-git-main-sulsul.vercel.app/'; //FIX DEPLOY LINK
  const router = useRouter();
  return (
    <header
      className={cn('flex h-full items-center justify-between py-4', className)}
      {...props}
    >
      {pathname === '/practice/ing' ? (
        <div className="relative flex w-full flex-row items-center justify-center">
          <ChevronLeft
            className="absolute left-0 top-0"
            onClick={() => router.push('/practice')}
          />
          <div className="text-xl font-medium ">실전연습</div>
        </div>
      ) : (
        <>
          <Link href={'/'}>
            <Logo />
          </Link>
          <Sheet>
            <SheetTrigger>
              <Image
                src="/images/icons/icon-menu.svg"
                alt="icon"
                width={24}
                height={24}
              />
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
                        <Sheet>
                          <SheetTrigger>
                            <div className="mt-4 flex items-center gap-4">
                              <Image
                                width={24}
                                height={24}
                                src={'/images/icons/user.svg'}
                                alt=""
                              />
                              <span>마이페이지</span>
                            </div>
                          </SheetTrigger>
                          <SheetContent side={'rightFull'} className="w-full">
                            <div className="mt-[132px] flex size-full flex-col items-center ">
                              <Image
                                src="/images/mobile-title.png"
                                width={255}
                                height={100}
                                alt="mobile-title"
                              />
                              <div className="flex flex-col items-center">
                                <span className="text-3xl font-semibold">
                                  PC버전으로 접속해주세요
                                </span>
                                <span className="font-normal text-gray-500">
                                  닉네임 수정과 회원탈퇴는 PC 환경에서 가능해요.
                                </span>
                              </div>
                              <Button
                                variant={'black'}
                                className="mt-6 py-[8.5px]"
                                onClick={() => {
                                  navigator.clipboard.writeText(copiedLink);
                                }}
                              >
                                <Image
                                  className="mr-1"
                                  src="/images/icons/icon-link-white.svg"
                                  width={20}
                                  height={20}
                                  alt="icon"
                                />{' '}
                                술술 링크 복사
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <SheetClose asChild>
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
                        </SheetClose>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AuthSignedIn>
              </div>
              <div>
                {MobileHeaderLinks.map((link) => {
                  const isActive = pathname === link.link;
                  const isPredictTab = link.label === '면접질문 예측';
                  return (
                    <>
                      {isPredictTab ? (
                        <Sheet>
                          <SheetTrigger>
                            <div className="flex flex-row items-center gap-1">
                              <span
                                className={cn(
                                  'flex p-5 mobile:p-4',
                                  'text-lg font-semibold',
                                )}
                              >
                                {link.label}
                              </span>
                              <div className="relative rounded-xl bg-blue-100 px-4 py-3">
                                <div className="text-center text-2xs text-blue-500">
                                  <p>PC 버전에서 이용해주세요</p>
                                </div>
                                <div className="absolute left-0 top-1/2 size-[12px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue-100" />
                              </div>
                            </div>
                          </SheetTrigger>
                          <SheetContent
                            side={'rightFull'}
                            className="justify-start overflow-y-scroll"
                          >
                            <div className="mt-[32px] flex size-full flex-col items-center justify-start">
                              <Image
                                src="/images/mobile-title.png"
                                width={255}
                                height={180}
                                alt="mobile-title"
                              />
                              <div className="flex flex-col items-center">
                                <span className="text-3xl font-semibold">
                                  PC버전으로 접속해주세요
                                </span>
                                <span className="font-normal text-gray-500">
                                  면접질문 예측은 PC 환경에서 가능해요.
                                </span>
                              </div>
                              <Button
                                variant={'black'}
                                className="mt-6 py-[8.5px]"
                                onClick={() => {
                                  navigator.clipboard.writeText(copiedLink);
                                }}
                              >
                                <Image
                                  className="mr-1"
                                  src="/images/icons/icon-link-white.svg"
                                  width={24}
                                  height={24}
                                  alt="icon"
                                />{' '}
                                술술 링크 복사
                              </Button>
                              <Image
                                className="mt-[129px]"
                                src="/images/mobile-direct.svg"
                                width={327}
                                height={220}
                                alt="mobile-direct"
                              />
                            </div>
                          </SheetContent>
                        </Sheet>
                      ) : (
                        <SheetClose asChild key={'mobile' + link.link}>
                          <Link
                            aria-label={
                              isActive ? `active ${link.label}` : link.label
                            }
                            className={cn(
                              'flex p-5 mobile:p-4',
                              'text-lg font-semibold',
                            )}
                            href={link.link}
                          >
                            <span className="relative w-full">
                              {link.label}
                            </span>
                          </Link>
                        </SheetClose>
                      )}
                    </>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </header>
  );
};
