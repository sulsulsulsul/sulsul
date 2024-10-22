import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { APP_ROUTES } from '@/config/constants/app-routes';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import { useCurrentUser } from '@/entities/users/hooks';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';
import { useVideoStateStore } from '@/store/modal';

import { HeaderNavigation } from './header-navigation';
interface DesktopHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const DesktopHeader = ({ className, ...props }: DesktopHeaderProps) => {
  const { status } = useCurrentUser();
  const { pause } = useVideoStateStore();
  const { data, image } = useUserStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggingIn(false);
    }
  }, [status]);

  const renderLoginState = () => {
    if (status === 'authenticated')
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2" aria-label="user profile">
              <div className="relative size-9 overflow-hidden rounded-full bg-gray-100">
                <Image
                  alt=""
                  fill
                  src={image ? image : '/images/suri-profile.svg'}
                />
              </div>
              <span>{data.nickname}</span>
              <ChevronDown className="ml-2 text-gray-500" width={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[284px]">
            <DropdownMenuLabel>
              <div className="flex items-center gap-4">
                <div className="relative size-11 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    alt=""
                    fill
                    src={image ? image : '/images/suri-profile.svg'}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">
                    {data.nickname ?? 'no name'}
                  </span>
                  <span className="text-sm font-normal text-gray-600">
                    {data.email ?? 'no email'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={APP_ROUTES.my()}>
              <DropdownMenuItem className="flex cursor-pointer px-5 py-4 text-base font-medium">
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      src={'/images/icons/user.svg'}
                      alt=""
                    />
                    <span>마이페이지</span>
                  </div>

                  <ChevronRight className="text-gray-400" />
                </div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer gap-2 px-5 py-4 text-base font-medium"
              onClick={() => {
                signOut({ callbackUrl: '/' });
                useUserStore.persist.clearStorage();
              }}
            >
              <Image
                width={24}
                height={24}
                src={'/images/icons/icon-logout.svg'}
                alt=""
              />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    if (isLoggingIn) {
      return (
        <Button
          size={'sm'}
          variant={'default'}
          aria-label="loading google login button"
          className="bg-blue-300"
        >
          <Image
            alt="icon"
            src="/images/icons/spinner.svg"
            className="mr-1.5 animate-spin"
            width={19}
            height={18}
          />
          로그인 중..
        </Button>
      );
    }
    if (status === 'unauthenticated')
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={'sm'}
              variant={'default'}
              aria-label="google login button"
              onClick={() => {
                pause();
              }}
            >
              지금 시작하기
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn('absolute left-0 top-0')}>
            <AlertDialogTitle />
            <AlertDialogDescription />
            <SignInView callbackUrl="/" onSignIn={() => setIsLoggingIn(true)} />
          </AlertDialogContent>
        </AlertDialog>
      );
  };

  return (
    <header
      className={cn(
        'flex h-full items-center justify-between gap-[46px] tablet:gap-6',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-[46px] tablet:gap-6">
        <Link href={'/'}>
          <Logo />
        </Link>
        <HeaderNavigation className="gap-[46px] tablet:gap-6" />
      </div>
      {renderLoginState()}
    </header>
  );
};
