import Image from 'next/image';

import savingIcon from '/public/images/icons/save-loader.svg';

export const SavingStatus = () => {
  return (
    <>
      <Image
        src={savingIcon}
        width={24}
        height={24}
        alt="저장중"
        className="animate-spin"
      />
      <span className="text-sm text-gray-500">저장중...</span>
    </>
  );
};
