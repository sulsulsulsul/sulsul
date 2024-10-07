'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import kakaoImg from '/public/images/kakaopay-button.svg';

function DonationButton() {
  const pathName = usePathname();

  const handleClickButton = () => {
    const width = 800;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      '/donation',
      'PopupWindow',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };
  return (
    <div
      role="button"
      onClick={handleClickButton}
      className={cn(
        'fixed bottom-10 left-10 z-50 flex cursor-pointer flex-col items-center',
      )}
    >
      <Image src={kakaoImg} alt="후원하기 아이콘" width={100} height={52} />
      <p className="text-base font-semibold underline">페이로 후원하기</p>
    </div>
  );
}

export default DonationButton;
