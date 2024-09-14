import Image from 'next/image';

export const BestCommentsSection = () => {
  return (
    <div className="mt-[6px] flex w-[282px] flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-pin.svg"
          width={24}
          height={24}
          alt="icon"
        />
        <h3 className="text-lg font-bold">지난주 BEST 답변</h3>
      </div>
      <div className="flex h-[478px] w-full flex-col items-center justify-center gap-4 rounded-md border border-gray-200 bg-white px-5 shadow-base">
        <div className="flex gap-[13px] text-lg font-bold">
          <div>Q </div>
          <div>어떤 사람들과 일할 때 가장 좋은 시너지가 나나요?</div>
        </div>
        <ul className="flex flex-col gap-6">
          <li className="flex gap-[13px]">
            <div className="text-lg font-semibold text-gray-400">1</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Image
                  src="/images/suri-profile.svg"
                  width={24}
                  height={24}
                  alt="icon"
                />
                <div className="text-sm text-gray-600">달리는 키보드</div>
              </div>
              <div className="line-clamp-2 text-base text-gray-700">
                저는 호기심이 많은 분들과 일할 때 더 많은 자극을 받는 것
                같습니다.저는 호기심이 많은 분들과 일할 때 더 많은 자극을 받는
                것 같습니다.
              </div>
            </div>
          </li>
          <li className="flex gap-[13px]">
            <div className="text-lg font-semibold text-gray-400">1</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Image
                  src="/images/suri-profile.svg"
                  width={24}
                  height={24}
                  alt="icon"
                />
                <div className="text-sm text-gray-600">달리는 키보드</div>
              </div>
              <div className="line-clamp-2 text-base text-gray-700">
                저는 호기심이 많은 분들과 일할 때 더 많은 자극을 받는 것
                같습니다.
              </div>
            </div>
          </li>
          <li className="flex gap-[13px]">
            <div className="text-lg font-semibold text-gray-400">1</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Image
                  src="/images/suri-profile.svg"
                  width={24}
                  height={24}
                  alt="icon"
                />
                <div className="text-sm text-gray-600">달리는 키보드</div>
              </div>
              <div className="line-clamp-2 text-base text-gray-700">
                저는 호기심이 많은 분들과 일할 때 더 많은 자극을 받는 것
                같습니다.
              </div>
            </div>
          </li>
        </ul>
        <button className="mt-2 w-full border-t border-gray-200 pt-3 text-center text-base text-gray-500">
          Best 답변 모두 보기
        </button>
      </div>
    </div>
  );
};
