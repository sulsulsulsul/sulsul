import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[28px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-900 disabled:bg-gray-200 disabled:text-gray-500',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        green:
          'bg-green-100 text-green-900 hover:bg-green-400 hover:text-green-900 focus:bg-green-900 focus:text-white active:bg-green-900 active:text-white',
        black: 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900',
        outline:
          'border border-gray-300 text-base font-semibold text-gray-600 hover:bg-gray-100 active:bg-gray-200',
        kakao:
          'w-full justify-start gap-4 bg-[#FEE500] text-start hover:opacity-70 active:opacity-80',
        google:
          'w-full justify-start gap-4 border bg-white text-start hover:opacity-70 active:opacity-80',
        cancel:
          'border border-gray-400 bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-600 active:border-gray-600 active:bg-gray-500 active:text-white',
      },
      size: {
        default: 'px-4 py-[13px] text-base font-bold',
        sm: 'px-4 py-[11px] text-[15px] font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
