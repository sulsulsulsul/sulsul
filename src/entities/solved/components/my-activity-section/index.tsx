import Image from 'next/image';

export const MyActivitySection = () => {
  return (
    <div className="mt-[6px] flex w-full flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-my-activity.svg"
          width={24}
          height={24}
          alt="icon"
        />
        <h3 className="text-lg font-bold">내 활동</h3>
      </div>
      <div className="flex h-[130px] w-full flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-5 shadow-base">
        <div className="flex w-full flex-col gap-1 text-lg">
          <h3 className="font-bold">내가 받은 추천수</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-semibold">
              <div className="text-gray-500">이번달</div>
              <div className="text-blue-500">43</div>
            </div>
            <div className="flex justify-between font-semibold">
              <div className="text-gray-500">전체</div>
              <div className="text-blue-500">128</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
