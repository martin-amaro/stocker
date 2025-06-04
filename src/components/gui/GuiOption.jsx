import React from 'react'
import { Select } from '@base-ui-components/react/select';
import { Check } from 'lucide-react';



export const GuiOption = ({ value, children }) => {
  return (
    <Select.Item
      className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-blue-500"
      value={value}
    >
      <Select.ItemIndicator className="col-start-1">
        <Check className="size-3" strokeWidth='4'/>
        
      </Select.ItemIndicator>
      <Select.ItemText className="col-start-2 flex gap-2 items-center">{children}</Select.ItemText>
    </Select.Item>
  )
}
