'use client';
import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LandingFooterLinks } from '@/config/constants/navigation-links';
import { cn } from '@/lib/utils';
interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  const copiedLink = 'https://www.sulsul-interview.kr/';

  return (
    <div className={cn('container', className)} {...props}>
      <div
        className={cn(
          'flex flex-row p-8 mobile:p-0 mobile:text-sm mobile:py-5 border-b mobile:gap-[24px] gap-10 justify-center items-center',
          className,
        )}
        {...props}
      >
        {LandingFooterLinks.map((link, index) => {
          return link.label == '면접질문 예측' ? (
            <Sheet key={'footer' + link.link}>
              <SheetTrigger>
                <p className="font-semibold text-[#3E404B] sm:text-lg mobile:text-sm mobile:font-medium">
                  {link.label}
                </p>
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
                    className="mt-6 py-[8.5px] font-medium"
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
            <Link
              key={'footer' + link.link}
              className={cn(
                'text-[#3E404B] sm:text-lg font-semibold mobile:text-sm mobile:font-medium',
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
      <div className="flex items-center justify-between py-6 mobile:justify-center mobile:py-5">
        <Image
          alt="logo"
          className="mobile:hidden"
          src="/images/footer-logo.svg"
          width={92}
          height={22}
        />
        <p className="text-lg font-medium text-[#3E404B] opacity-50 mobile:text-2xs">
          © 2024 Sulsul. All rights reserved.
        </p>
      </div>
    </div>
  );
};
