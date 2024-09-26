import { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import { VideoProps } from '@/components/shared/video';
import { cn } from '@/lib/utils';
const Video = dynamic(
  () => import('@/components/shared/video').then((mod) => mod.Video),
  {
    ssr: false,
  },
);

const stepVideos = [
  '/videos/step-1.mp4',
  '/videos/step-2.mp4',
  '/videos/step-3.mp4',
];
interface StepVideosProps extends HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  videoState: 'paused' | 'play';
}

export const StepVideos = ({
  className,
  activeStep,
  videoState,
  ...props
}: StepVideosProps) => {
  const refs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  useEffect(() => {
    refs.current.forEach((video, index) => {
      if (videoState === 'paused' || activeStep !== index) {
        video?.pause();
      } else {
        video?.play();
      }
    });
  }, [activeStep, videoState]);
  return (
    <div className={cn(className)} {...props}>
      {stepVideos.map((video, index) => (
        <ForwardedRefVideo
          ref={(el) => {
            refs.current[index] = el;
          }}
          autoPlay
          loop
          muted
          key={index}
          src={video}
          className={cn(
            'hidden rounded-[30px]  border border-gray-200 top-0 z-0',
            {
              'inline-block z-50': activeStep === index,
            },
          )}
        />
      ))}
    </div>
  );
};

const ForwardedRefVideo = forwardRef<HTMLVideoElement, VideoProps>(
  (props, ref) => <Video videoRef={ref} {...props} />,
);

ForwardedRefVideo.displayName = 'ForwardedRefVideo';
