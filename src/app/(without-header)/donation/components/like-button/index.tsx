'use client';

import { useRef, useState } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import { HeartAnimation } from '@/components/lotties/heart-animation';
import { usePutLike } from '@/entities/donation/hooks/use-put-like';

interface LikeButtonProps {
  initialLikes: number;
  donationNo: number;
  onLike?: () => Promise<void>;
}

function LikeButton({ initialLikes, donationNo }: LikeButtonProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [likes, setIsLikes] = useState(initialLikes);
  const { mutate } = usePutLike();

  const handleClick = async () => {
    try {
      await mutate(donationNo);
      setIsLikes((prev) => prev + 1);
      lottieRef.current?.goToAndPlay(0);

      setTimeout(() => {
        lottieRef.current?.stop();
      }, 2800);
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  return (
    <>
      <div className="relative flex w-[80px] justify-end">
        <div role="button" className=" cursor-pointer" onClick={handleClick}>
          <HeartAnimation
            loop={false}
            lottieRef={lottieRef}
            autoplay={false}
            className="absolute -top-1/3 right-10 size-10 cursor-pointer"
          />
        </div>
        <div className="w-10 text-left">
          <span className="font-medium text-gray-600">
            {likes > 999 ? '999+' : likes}
          </span>
        </div>
      </div>
    </>
  );
}

export default LikeButton;
