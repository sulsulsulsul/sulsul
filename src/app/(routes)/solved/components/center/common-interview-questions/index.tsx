import Image from 'next/image';

const CommonInterviewQuestions = () => {
  return (
    <>
      <p className="flex items-center gap-1 text-3xl font-bold">
        <Image
          src="/images/icons/icon-etc-speech.svg"
          width={32}
          height={32}
          alt="icon"
        />
        다같이 면접 기출
      </p>
      <div className="mt-[8px] rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        다같이 면접 기출 내용
      </div>
    </>
  );
};

export default CommonInterviewQuestions;
