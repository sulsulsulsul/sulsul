import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className)} {...props}>
      Footer
    </footer>
  )
}
