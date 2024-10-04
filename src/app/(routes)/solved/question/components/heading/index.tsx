import Image from 'next/image';

const Heading = () => {
  return (
    <p className="mb-[4] flex gap-1 pl-[77px] text-4xl font-bold">
      <Image
        src="/images/icons/etc-speech.svg"
        width={32}
        height={32}
        alt="icon"
      />
      최다 빈출 기본질문 <span className="text-blue-500">10</span>
    </p>
  );
};

export default Heading;
