import React, { useState } from 'react'
import { Select, Option } from '@mui/base';

export default function MuiBaseSelect() {
  const [value, setValue] = useState(null);

  return (
    <div className="w-64">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Selecciona una opción
      </label>
      <Select
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        slotProps={{
          listbox: {
            className:
              'mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-sm shadow-lg focus:outline-none',
          },
          popper: {
            className: 'z-10',
          },
        }}
      >
        <Option value="opcion1" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Opción 1
        </Option>
        <Option value="opcion2" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Opción 2
        </Option>
        <Option value="opcion3" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Opción 3
        </Option>
      </Select>
    </div>
  );
}