import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, placeholder, value = '', onChange, onKeyDown, ...props },
    ref,
  ) => {
    const spanRef = React.useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = React.useState('0');

    React.useEffect(() => {
      if (spanRef.current) {
        const newWidth = spanRef.current.clientWidth;
        const displayValue = value?.toString() || placeholder || '';
        spanRef.current.textContent = displayValue;

        value === ''
          ? setInputWidth(`${newWidth + 8}px`)
          : setInputWidth(`${newWidth + 16}px`);
      }
    }, [value, placeholder]);

    return (
      <>
        <input
          ref={ref}
          value={value}
          className={cn(
            `rounded-sm bg-gray-100 outline-none py-2 text-sm px-2 text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            value ? 'text-center' : 'text-left',
            className,
          )}
          onChange={onChange}
          style={{
            width: inputWidth,
          }}
          {...props}
          placeholder={placeholder}
        />
        <div
          ref={spanRef}
          className="invisible absolute top-[-10000] inline-block h-0"
          aria-hidden="true"
        >
          {value || placeholder}
        </div>
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
