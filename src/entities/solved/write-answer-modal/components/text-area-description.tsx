export const TextAreaDescription = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div
      className={`pointer-events-none absolute left-[19px] right-4 top-4 flex w-full flex-col justify-center gap-2 text-gray-400 ${show ? 'block' : 'hidden'}`}
    >
      <p className="text-base font-semibold">
        아래와 같이 답변을 구성해보세요.
      </p>
      <div className="flex items-center gap-2">
        <div className="relative flex flex-col items-center">
          <div className="z-10 flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[12px] font-bold text-white">
            1
          </div>
          <div className="absolute left-[8.5px] top-3 z-0 h-14 w-px bg-gray-300"></div>
        </div>
        <div className="text-base text-gray-500">결론 · 핵심 메세지</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="z-10 flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[12px] font-bold text-white">
            2
          </div>
        </div>
        <div className="text-base text-gray-500">
          1번을 뒷받침할 근거와 예시
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="z-10 flex size-[18px] items-center justify-center rounded-full bg-gray-300 text-[12px] font-bold text-white">
            3
          </div>
        </div>
        <div className="text-base text-gray-500">정리하며 강조</div>
      </div>
    </div>
  );
};
