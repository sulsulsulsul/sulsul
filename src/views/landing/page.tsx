import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface LandingProps extends HTMLAttributes<HTMLDivElement> {}

export const Landing = ({ className, ...props }: LandingProps) => {
  return (
    <div className={cn(className)} {...props}>
      Landing
    </div>
  )
}
