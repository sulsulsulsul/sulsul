const LeftPart = () => {
  return (
    <div className="grow basis-0">
      <p className="mb-[8px] mt-[5px] text-lg font-bold">내 활동</p>
      <div className="mb-[30px] rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        내 활동 내용
      </div>
      <p className="mb-[8px] text-lg font-bold">이번주 랭킹</p>
      <div className="rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        이번주 랭킹 내용
      </div>
    </div>
  );
};

export default LeftPart;
