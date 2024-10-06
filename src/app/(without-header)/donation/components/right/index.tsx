import Rank from '../rank';

function RightBox() {
  return (
    <div className="flex size-[320px] flex-col items-center rounded-md bg-white px-8 pt-[26px]">
      <div className="mb-6 text-center">
        <p className="text-2xl font-bold text-gray-900">
          후원해주신 감사한 분들
        </p>
        <p className="text-2xs font-medium text-gray-500">
          랭킹은 후원금액순이에요.
        </p>
      </div>
      <Rank />
    </div>
  );
}

export default RightBox;
