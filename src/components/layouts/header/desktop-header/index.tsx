import { HTMLAttributes, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog'
import { ChevronDown, ChevronRight } from 'lucide-react'

import { Logo } from '@/components/shared/logo'
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { APP_ROUTES } from '@/config/constants/app-routes'
import { SignInView } from '@/entities/auth/views/sign-in-view'
import { useCurrentUser } from '@/entities/users/hooks'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/client'
import { useVideoStateStore } from '@/store/modal'

import { HeaderNavigation } from './header-navigation'
interface DesktopHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const DesktopHeader = ({ className, ...props }: DesktopHeaderProps) => {
  const { status } = useCurrentUser()
  const { pause, restart } = useVideoStateStore()
  const { nickname, email, image } = useUserStore((state) => ({
    nickname: state.data.nickname,
    email: state.data.email,
    image: state.image,
  }))
  const callbackUrl = usePathname()
  console.log(callbackUrl)

  const renderLoginState = () => {
    if (status === 'authenticated')
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2" aria-label="user profile">
              <div className="relative size-9 overflow-hidden rounded-full bg-gray-100">
                <Image alt="" fill src={image ?? ''} />
              </div>

              <span>{nickname}</span>
              <ChevronDown className="ml-2 text-gray-500" width={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[284px]">
            <DropdownMenuLabel>
              <div className="flex items-center gap-4">
                <div className="relative size-11 overflow-hidden rounded-full bg-gray-100">
                  <Image alt="" fill src={image ?? ''} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">
                    {nickname ?? 'no name'}
                  </span>
                  <span className="text-sm font-normal text-gray-600">
                    {email ?? 'no email'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-5 py-4 text-base font-medium">
              <div className="flex w-full justify-between">
                <Link
                  href={APP_ROUTES.my()}
                  className="flex items-center gap-2"
                >
                  <Image
                    width={24}
                    height={24}
                    src={'/images/icons/user.svg'}
                    alt=""
                  />
                  <span>마이페이지</span>
                </Link>
                <ChevronRight className="text-gray-400" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 px-5 py-4 text-base font-medium"
              onClick={() => {
                signOut()
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
      )
    if (status === 'unauthenticated')
      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              size={'sm'}
              variant={'default'}
              aria-label="google login button"
              onClick={() => pause()}
            >
              무료로 시작하기
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn('absolute left-0 top-0')}>
            <AlertDialogTitle />
            <AlertDialogDescription />
            <SignInView callbackUrl="/">
              <AlertDialogCancel
                onClick={() => restart()}
                className="absolute right-6 top-6 size-6 border-none"
              >
                <Image
                  className="absolute fill-gray-400"
                  width={24}
                  height={24}
                  src={'/images/icons/icon-close-L.svg'}
                  alt="close"
                />
              </AlertDialogCancel>
            </SignInView>
          </AlertDialogContent>
        </AlertDialog>
      )
    return <div aria-label="user status loading">...loading</div>
  }

  return (
    <header
      className={cn('flex h-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-[46px]">
        <Link href={'/'}>
          <Logo />
        </Link>
        <HeaderNavigation className="gap-[46px]" />
      </div>
      {renderLoginState()}
    </header>
  )
}
