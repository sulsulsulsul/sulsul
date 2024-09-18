import Image from 'next/image';

const Character = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/images/solved/character_text.svg"
        width={160}
        height={116}
        alt="character text"
      />
      <Image
        src="/images/solved/character.png"
        width={160}
        height={116}
        alt="character"
      />
    </div>
  );
};

export default Character;
