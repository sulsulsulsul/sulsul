'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

//예상 면접질문
interface ResumeSelection {
  title: string
  companyName: string
  checked: boolean
}
export default function MyResumeSelection() {
  const [checked, setCheck] = useState(false)
  return (
    <div
      className={cn(
        'flex flex-row pt-1.5 pl-6 pb-3 border border-solid-gray-100',
        checked ? 'bg-blue-100' : 'bg-white',
      )}
    >
      <div className="flex w-[506px] flex-col">
        <div className="flex flex-row items-center font-semibold">
          <div className="size-11 rounded-full p-[10px] hover:bg-blue-100 ">
            <Checkbox
              className="m-[2px] size-5"
              onChange={() => {
                setCheck((prev) => !prev)
              }}
            />
          </div>
          <div className="truncate text-base text-blue-800">
            자소서 제목 자소서 제목자소서 제목자소서 제목자소서 제목자소서
            제목자소서 제목자소서 제목자소서 제목자소서 제목자소서 제목
          </div>
        </div>
        <span className="ml-11 h-8 items-center rounded-sm bg-white px-2.5 py-2 text-2xs">
          o o 기업명
        </span>
      </div>
      <button className="ml-4">
        {/* active state change the icon color */}
        <Image
          src="/images/icons/icon-chevron_right_l.svg"
          alt="chevron-right"
          className="fill-current text-blue-800"
          width={24}
          height={24}
        ></Image>
      </button>
    </div>
  )
}
