import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectDropdownProps {
  onChangeSortType: (value: 'asc' | 'desc') => void;
}
export default function SelectDropdown({
  onChangeSortType,
}: SelectDropdownProps) {
  return (
    <Select onValueChange={onChangeSortType}>
      <SelectTrigger className="absolute right-0 w-[100px]">
        <SelectValue placeholder="최근 순" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="desc">최근 순</SelectItem>
          <SelectItem value="asc">오래된 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
