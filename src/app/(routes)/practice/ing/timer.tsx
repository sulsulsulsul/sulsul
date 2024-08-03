import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { set } from 'zod'

export default function Timer() {
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  let timeInterval = useRef<null | ReturnType<typeof setTimeout>>(null)
  const handleStart = () => {
    if (isRunning) return
    setIsRunning(true)
    timeInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1000)
    }, 1000)
  }

  const handlePause = () => {
    if (!isRunning) return
    setIsRunning(false)
    clearInterval(timeInterval.current!)
  }

  const handleReset = () => {
    setIsRunning(false)
    clearInterval(timeInterval.current!)
    setTimer(0)
  }
  const formatTime = (timer: number) => {
    const minutes = Math.floor(timer / 60000)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor((timer / 1000) % 60)
      .toString()
      .padStart(2, '0')

    return { minutes, seconds }
  }
  const { minutes, seconds } = formatTime(timer)
  console.log(isRunning, minutes, seconds)
  return (
    <div className="flex w-fit flex-row gap-1 rounded-xl bg-gray-800  px-3 py-[11px]">
      {isRunning ? (
        <button onClick={handlePause}>
          <Image
            src="/images/icons/icon-stop.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </button>
      ) : (
        <button onClick={handleStart}>
          <Image
            src="/images/icons/icon-play.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="text-lg font-semibold text-white">
        {minutes + ' : ' + seconds}
      </div>
      <button onClick={handleReset}>
        <Image
          src="/images/icons/icon-redo.svg"
          alt="icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  )
}
