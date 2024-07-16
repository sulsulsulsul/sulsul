'use client'

import { cn } from '@/lib/utils'
import { ForwardedRef, MediaHTMLAttributes } from 'react'
export interface VideoProps extends MediaHTMLAttributes<HTMLVideoElement> {
  videoRef?: ForwardedRef<HTMLVideoElement>
}

export const Video = ({ className, videoRef, ...props }: VideoProps) => {
  return (
    <video
      ref={videoRef}
      webkit-playsinline="true"
      playsInline={true}
      className={cn(className)}
      {...props}
    />
  )
}
