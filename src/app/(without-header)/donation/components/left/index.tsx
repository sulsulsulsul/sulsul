import Image from 'next/image';

import logoImg from '/public/images/kakaopay-logo.svg';
import qrImg from '/public/images/kakaopay-qr.svg';

function LeftBox() {
  return (
    <div className="flex size-[320px] flex-col items-center gap-5 rounded-md bg-white pt-[34px]">
      <Image src={logoImg} alt="카카오페이 Logo" width={100} height={30} />
      <Image src={qrImg} alt="카카오페이 QR" width={207} height={207} />
    </div>
  );
}

export default LeftBox;
