import Image from 'next/image';

export const TogetherSolvedHeader = () => {
  return (
    <>
      <div className="relative flex">
        <div className="flex flex-1 gap-1">
          <Image
            src="/images/icons/etc-speech.svg"
            width={32}
            height={32}
            alt="icon"
          />
          <h2 className="text-[20px] font-bold">다같이 면접기출</h2>
        </div>
        <Image
          src="/images/icons/icon-information circle.svg"
          className="absolute bottom-0 right-4"
          width={24}
          height={24}
          alt="icon"
        />
      </div>
    </>
  );
};
