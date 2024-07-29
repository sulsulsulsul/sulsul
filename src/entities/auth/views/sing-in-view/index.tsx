import { HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface SingInViewProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: string
}

export const SingInView = ({
  className,
  callbackUrl,
  ...props
}: SingInViewProps) => {
  return (
    <div className={cn(className)} {...props}>
      <main className="size-full h-full">
        <div className="absolute left-0 top-0 h-screen w-screen bg-gray-800/70" />
        <div className="mt-[50px] flex items-center justify-center">
          <div className="relative z-10 h-[524px] w-[432px] rounded-md bg-white ">
            <Link href={callbackUrl} className="absolute right-8 top-8">
              <Image
                className="fill-gray-400"
                width={24}
                height={24}
                src={'/images/icons/icon-close-L.svg'}
                alt="close"
              />
            </Link>
            <div className="flex size-full flex-col items-center gap-[28px] px-[46px] pb-[40px] pt-[56px]">
              <div className="text-center text-4xl font-bold">
                <h2>간편하게 로그인하고</h2>
                <h2>체계적인 면접 준비를 시작하세요.</h2>
              </div>
              <div>
                <Image
                  priority
                  src="/images/character-login.svg"
                  width={170}
                  height={148}
                  alt="character-login"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Button
                  className="bg-[#FEE500] pl-[65px]"
                  onClick={() => signIn('kakao', { callbackUrl })}
                  variant={'kakao'}
                >
                  <Image
                    src="/images/kakao.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="translate-y-px text-lg font-bold text-black">
                    카카오로 3초만에 시작하기
                  </span>
                </Button>
                <Button
                  className="pl-[65px]"
                  onClick={() => signIn('google', { callbackUrl })}
                  variant={'google'}
                >
                  <Image
                    src="/images/google.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="translate-y-px text-lg font-bold text-black">
                    구글로 3초만에 시작하기
                  </span>
                </Button>
                <div className="mt-1 text-center text-2xs font-medium">
                  <p>
                    로그인 시,{' '}
                    <Link href={'/privacy-policy'} className="text-blue-600">
                      개인정보처리방침{' '}
                    </Link>
                    및{' '}
                    <Link href={'/privacy-policy'} className="text-blue-600">
                      서비스 약관
                    </Link>
                    을
                  </p>
                  <p>준수하고 동의하는 것으로 간주합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
