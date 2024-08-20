import Image from 'next/image';

import folderIcon from '/public/images/icons/folder.svg';

export const SaveCompletedStatus = () => {
  return (
    <>
      <Image
        src={folderIcon}
        width={24}
        height={24}
        alt="저장 완료"
        // className="animate-spin"
      />
      <span className="text-sm text-gray-500">아카이브에 저장완료</span>
    </>
  );
};
