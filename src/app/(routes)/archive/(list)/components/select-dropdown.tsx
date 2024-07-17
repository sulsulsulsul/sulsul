import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectDropdownProps {
  setIsRecent: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SelectDropdown({ setIsRecent }: SelectDropdownProps) {
  const handleChange = (value: string) => {
    setIsRecent(value === '최근순')
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="최근 순" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="최근순">최근 순</SelectItem>
          <SelectItem value="오래된순">오래된 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
