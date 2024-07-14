'use client';

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SortFilter({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="name">Sorted by Name</SelectItem>
          <SelectItem value="id">Sorted by ID</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}