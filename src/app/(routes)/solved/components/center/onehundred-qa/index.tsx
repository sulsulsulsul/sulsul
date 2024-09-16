import Image from 'next/image';

const OnehundredQa = () => {
  return (
    <>
      <p className="mb-[8px] mt-[42px] flex items-center gap-1 text-3xl font-bold">
        <Image
          src="/images/icons/icon-flag.svg"
          width={32}
          height={32}
          alt="icon"
        />
        백문백답 첼린지
      </p>
      <div className="rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <p className="flex items-center gap-1 text-2xs text-gray-500">
          첼린지 진행상황
        </p>
        <div className="flex justify-between">
          <p className="flex items-center gap-1 text-4xl font-bold text-blue-500">
            8/100
            <span className="mt-[3px] text-xs text-blue-500">개</span>
          </p>
          <p className="flex items-center gap-1 text-xl text-gray-700">
            지원자들 중
            <span className="text-xl font-bold text-gray-900">상위 72%</span>에
            속해요
          </p>
        </div>
      </div>
    </>
  );
};
export default OnehundredQa;
