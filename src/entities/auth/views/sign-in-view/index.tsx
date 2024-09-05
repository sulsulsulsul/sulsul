import { HTMLAttributes, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { AuthSignedOut } from '@/components/auth/auth-signed-out';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useVideoStateStore } from '@/store/modal';

type SingInViewProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    callbackUrl: string;
  };
export const SignInView = ({
  className,
  callbackUrl,
  ...props
}: SingInViewProps) => {
  const { restart } = useVideoStateStore();
  const isMobile = window.innerWidth <= 767;

  return (
    <AuthSignedOut>
      <div className={cn(className)} {...props}>
        <main className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800/80">
          <div className="relative z-50 h-[524px] w-[432px] rounded-md bg-white mobile:h-[464px] mobile:w-[360px]">
            <AlertDialogCancel
              onClick={() => restart()}
              className="absolute right-6 top-6 size-6 border-none mobile:size-4"
            >
              <Image
                className="absolute fill-gray-400"
                width={24}
                height={24}
                src={'/images/icons/icon-close-L.svg'}
                alt="close"
              />
            </AlertDialogCancel>
            <div className="flex size-full flex-col items-center gap-[28px] px-[46px] pb-[40px] pt-[56px] mobile:gap-[18px]">
              <div className="text-center text-4xl font-bold mobile:text-3xl">
                <h2>간편하게 로그인하고</h2>
                <h2>체계적인 면접준비를 시작하세요!</h2>
              </div>
              <div>
                <Image
                  priority
                  src="/images/character-login.svg"
                  width={isMobile ? 142 : 170}
                  height={isMobile ? 124 : 148}
                  alt="character-login"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Button
                  className="flex items-center justify-center bg-[#FEE500]"
                  onClick={() => signIn('kakao', { callbackUrl })}
                  variant={'kakao'}
                >
                  <Image
                    src="/images/kakao.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="translate-y-px text-lg font-bold text-black mobile:text-base">
                    카카오로 3초만에 시작하기
                  </span>
                </Button>
                <Button
                  className=" flex items-center justify-center"
                  onClick={() => signIn('google', { callbackUrl })}
                  variant={'google'}
                >
                  <Image
                    src="/images/google.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="translate-y-px text-lg font-bold text-black mobile:text-base">
                    구글로 3초만에 시작하기
                  </span>
                </Button>
                <div className="mt-1 text-center text-2xs font-medium">
                  <p>
                    로그인 시,{' '}
                    <Link
                      href={
                        'https://striped-wildebeest-3c8.notion.site/accf6e3d9f104702838f9dc74f011813'
                      }
                      className="text-blue-600"
                    >
                      개인정보처리방침{' '}
                    </Link>
                    및{' '}
                    <Link
                      href={
                        'https://striped-wildebeest-3c8.notion.site/deb597c5712f4d9698d7b9562b9099ba?pvs=4'
                      }
                      className="text-blue-600"
                    >
                      서비스 약관
                    </Link>
                    을
                  </p>
                  <p>준수하고 동의하는 것으로 간주합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthSignedOut>
  );
};
