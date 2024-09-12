//리팩토링 예정
import Image from 'next/image';

export const WeekRankingSection = () => {
  return (
    <div className="mt-[6px] flex w-[282px] flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-crown.svg"
          width={24}
          height={24}
          alt="icon"
        />
        <div className="text-lg font-bold">이번주 랭킹</div>
      </div>
      <ul className="flex h-[218px] w-full flex-col items-center justify-center gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-base">
        <li className="flex w-full gap-2">
          <Image
            src="/images/suri-profile.svg"
            width={40}
            height={40}
            alt="icon"
          />

          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="text-2xs font-semibold text-blue-500">
                S-마스터
              </div>
              <div className="text-2xs font-bold text-gray-500">
                누적 추천수
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                한결같은 회의실
              </div>
              <div className="text-2xs font-bold">999+</div>
            </div>
          </div>
        </li>
        <li className="flex w-full gap-2">
          <Image
            src="/images/suri-profile.svg"
            width={40}
            height={40}
            alt="icon"
          />

          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="text-2xs font-semibold text-blue-500">
                S-마스터
              </div>
              <div className="text-2xs font-bold text-gray-500">
                누적 추천수
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                한결같은 회의실
              </div>
              <div className="text-2xs font-bold">999+</div>
            </div>
          </div>
        </li>
        <li className="flex w-full gap-2">
          <Image
            src="/images/suri-profile.svg"
            width={40}
            height={40}
            alt="icon"
          />

          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <div className="text-2xs font-semibold text-blue-500">
                S-마스터
              </div>
              <div className="text-2xs font-bold text-gray-500">
                누적 추천수
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                한결같은 회의실
              </div>
              <div className="text-2xs font-bold">999+</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
