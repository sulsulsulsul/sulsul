import Image from 'next/image';

import success from '/public/images/icons/toast-success.svg';

export const SuccessIcon = () => {
  return <Image src={success} alt="성공아이콘" width={24} height={24} />;
};
