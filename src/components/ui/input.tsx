import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, placeholder, value, onChange, onKeyDown, ...props },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const spanRef = React.useRef<HTMLSpanElement | null>(null)
    const [inputWidth, setInputWidth] = React.useState('auto')

    React.useEffect(() => {
      const handleInput = () => {
        if (spanRef.current && inputRef.current) {
          spanRef.current.textContent =
            inputRef.current.value || placeholder || ''
          setInputWidth(`${spanRef.current.scrollWidth}px`)
        }
      }

      if (inputRef.current) {
        handleInput() // Initialize width

        inputRef.current.addEventListener('input', handleInput)
        return () => {
          inputRef.current?.removeEventListener('input', handleInput)
        }
      }
    }, [placeholder])

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = String(value) || ''
      }

      const handleEnterKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          if (inputRef.current) {
            inputRef.current.value = ''
          }

          setInputWidth((prev) => '73px') // Reset width on Enter
        }
      }

      if (inputRef.current) {
        inputRef.current.addEventListener('keyup', handleEnterKeyUp)

        return () => {
          inputRef.current?.removeEventListener('keyup', handleEnterKeyUp)
        }
      }
    }, [value])

    return (
      <div className="relative inline-block">
        <input
          type={type}
          className={cn(
            'flex rounded-md border-0 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={(instance) => {
            inputRef.current = instance
            if (typeof ref === 'function') {
              ref(instance)
            } else if (ref) {
              ref.current = instance
            }
          }}
          onChange={(e) => {
            onChange && onChange(e)
            if (spanRef.current && inputRef.current) {
              spanRef.current.textContent = e.target.value || placeholder || ''
              setInputWidth(`${spanRef.current.scrollWidth}px`)
            }
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{ width: `calc(${inputWidth} + 1.5rem)` }}
          {...props}
        />
        <span
          ref={spanRef}
          className="invisible absolute left-0 top-0 h-0 overflow-hidden whitespace-pre"
          aria-hidden="true"
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
