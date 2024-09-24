import Image from 'next/image';

const Heading = () => {
  return (
    <p className="mb-[8px] mt-[42px] flex items-center gap-1 text-3xl font-bold">
      <Image
        src="/images/icons/icon-flag.svg"
        width={32}
        height={32}
        alt="icon"
      />
      백문백답 첼린지
    </p>
  );
};

export default Heading;
