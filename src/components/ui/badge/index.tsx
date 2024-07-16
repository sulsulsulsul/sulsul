import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-3 py-1.5 font-medium',
  {
    variants: {
      variant: {
        default: 'bg-white text-blue-500',
        secondary: 'bg-gray-100 text-gray-600',
        keyword:
          'border border-green-500 bg-green-100 px-4 py-2 text-base font-normal text-green-900',
        result:
          'border border-blue-500 bg-blue-100 px-4 py-2 text-base font-normal text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
