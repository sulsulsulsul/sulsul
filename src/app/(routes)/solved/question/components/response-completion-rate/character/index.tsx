'use client';

import Image from 'next/image';

import { MyChallengesProgressData } from '@/entities/types/challenges';

const Character = ({ data }: { data: MyChallengesProgressData[] }) => {
  let imgsrc = '';

  let totalCount = data.reduce(
    (accumulator: number, current: { count: number }) => {
      return accumulator + current.count;
    },
    0,
  );

  if (totalCount === 0) {
    imgsrc = 'txt1';
  } else if (0 < totalCount && totalCount < 10) {
    imgsrc = 'txt2';
  } else if (totalCount === 10) {
    imgsrc = 'txt3';
  } else if (totalCount === 11) {
    imgsrc = 'txt4';
  } else if (11 < totalCount && totalCount < 28) {
    imgsrc = 'txt5';
  } else if (totalCount === 28) {
    imgsrc = 'txt6';
  } else if (totalCount === 29) {
    imgsrc = 'txt7';
  } else if (28 < totalCount && totalCount < 46) {
    imgsrc = 'txt8';
  } else if (totalCount === 46) {
    imgsrc = 'txt9';
  } else if (totalCount === 47) {
    imgsrc = 'txt10';
  } else if (47 < totalCount && totalCount < 65) {
    imgsrc = 'txt11';
  } else if (totalCount === 65) {
    imgsrc = 'txt12';
  } else if (totalCount === 66) {
    imgsrc = 'txt13';
  } else if (66 < totalCount && totalCount < 85) {
    imgsrc = 'txt14';
  } else if (totalCount === 85) {
    imgsrc = 'txt15';
  } else if (totalCount === 86) {
    imgsrc = 'txt16';
  } else if (86 < totalCount && totalCount < 100) {
    imgsrc = 'txt17';
  } else if (totalCount === 100) {
    imgsrc = 'txt18';
  }

  const imgSize = (img: string) => {
    if (img === 'txt1' || img === 'txt9') {
      return 168;
    } else if (img === 'txt2') {
      return 153;
    } else if (img === 'txt3' || img === 'txt17') {
      return 173;
    } else if (img === 'txt4' || img === 'txt5') {
      return 180;
    } else if (img === 'txt6' || img === 'txt12' || img === 'txt15') {
      return 156;
    } else if (img === 'txt7' || img === 'txt8') {
      return 149;
    } else if (img === 'txt10' || img === 'txt11') {
      return 192;
    } else if (img === 'txt13' || img === 'txt14') {
      return 188;
    } else if (img === 'txt16') {
      return 176;
    } else if (img === 'txt18') {
      return 190;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {imgsrc && (
        <Image
          src={`/images/solved/${imgsrc}.svg`}
          width={imgSize(imgsrc)}
          height={74}
          alt="character text"
        />
      )}
      <Image
        src={`/images/solved/${totalCount !== 100 ? 'character.svg' : 'character2.svg'}`}
        width={160}
        height={116}
        alt="character"
      />
    </div>
  );
};

export default Character;
