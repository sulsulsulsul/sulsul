'use client'

import { ForwardedRef, MediaHTMLAttributes, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useVideoStateStore } from '@/store/modal'
export interface VideoProps extends MediaHTMLAttributes<HTMLVideoElement> {
  videoRef?: ForwardedRef<HTMLVideoElement>
}

export const Video = ({ className, videoRef, ...props }: VideoProps) => {
  const { videoPlaying } = useVideoStateStore()
  useEffect(() => {
    const setVideoState = () => {
      const videoPlayer = document.getElementById(
        'videoPlayer',
      ) as HTMLVideoElement
      videoPlaying && videoPlayer.paused
        ? videoPlayer.play()
        : videoPlayer.pause()
    }
    setVideoState()
  }, [videoPlaying])

  return (
    <video
      ref={videoRef}
      id="videoPlayer"
      webkit-playsinline="true"
      playsInline={true}
      className={cn(className)}
      {...props}
    />
  )
}
