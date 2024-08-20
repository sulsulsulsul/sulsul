import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, placeholder, value = '', onChange, onKeyDown, ...props },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const spanRef = React.useRef<HTMLDivElement | null>(null);
    const [inputWidth, setInputWidth] = React.useState('0');

    React.useEffect(() => {
      if (spanRef.current) {
        const newWidth = spanRef.current.clientWidth;
        const displayValue = value?.toString() || placeholder || '';
        spanRef.current.textContent = displayValue;

        value === '' && placeholder === '지원하는 기업'
          ? setInputWidth(`${newWidth + 8}px`)
          : setInputWidth(`${newWidth + 16}px`);
      }

      const handleEnterKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          if (spanRef.current)
            setInputWidth(`${spanRef.current?.scrollWidth + 16}px`); // Reset width on Enter
        }
      };

      if (inputRef.current) {
        inputRef.current.addEventListener('keyup', handleEnterKeyUp);

        return () => {
          inputRef.current?.removeEventListener('keyup', handleEnterKeyUp);
        };
      }
    }, [value, placeholder]);

    return (
      <>
        <input
          ref={(instance) => {
            inputRef.current = instance;
            if (typeof ref === 'function') {
              ref(instance);
            } else if (ref) {
              ref.current = instance;
            }
          }}
          value={value}
          className={cn(
            `rounded-sm bg-gray-100 outline-none py-2 text-sm px-2 text-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            value ? 'text-center' : 'text-left',
            className,
          )}
          onChange={(e) => {
            onChange && onChange(e);
            if (spanRef.current && inputRef.current) {
              spanRef.current.textContent = e.target.value || placeholder || '';
              setInputWidth(`${spanRef.current.scrollWidth}px`);
            }
          }}
          onKeyDown={onKeyDown}
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
