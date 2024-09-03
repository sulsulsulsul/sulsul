import Image from 'next/image';
import error from '/public/images/icons/toast-error.svg';

export const ErrorIcon = () => {
  return <Image src={error} alt="실패아이콘" width={24} height={24} />;
};
