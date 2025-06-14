import React, { useRef, useState } from 'react';
import { Select } from '@base-ui-components/react/select';
import { GuiOption } from './GuiOption';
import { BedDouble, ChefHat, Dumbbell, Forklift, HardHat, Martini, Shirt } from 'lucide-react';

export const GuiSelect = ({ defaultValue, value, placeholder, onChange, children, className="" }) => {
  // const [value, setValue] = useState(null);
  const popperRef = useRef(null);

  return (
    <Select.Root defaultValue={defaultValue} value={value} onValueChange={(value) => onChange(value)} >
        <Select.Trigger className={"flex h-10 min-w-36 items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100  focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100 " + className}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="flex">
            <ChevronUpDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="outline-none z-100" sideOffset={0} side='bottom' alignItemWithTrigger={false}>
            <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
            <Select.Popup className="group [max-height:var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline  outline-gray-200 transition-[transform,scale,opacity]  data-[ending-style]:scale-100  data-[ending-style]:opacity-100 data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
              {children}
            </Select.Popup>
            <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
}

function ChevronUpDownIcon(props) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
