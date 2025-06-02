import React from 'react'
import { ErrorMessage } from '../auth/ErrorMessage'

export const SimpleInput = ({ label, name, type, onChange, disabled, placeholder, error, readOnly, value, autoComplete='on'}) => {
  return (
    <div>
      {label && <label className="font-medium text-base text-slate-800 mb-1 block">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={"text-slate-900 bg-white border border-slate-300 w-sm text-sm p-2 mt-1 rounded-md outline-blue-500" +
          (readOnly ? ' cursor-default outline-0 border-transparent text-neutral-500!' : ' focus:outline-blue-500 ') +
          (error ? ' border-red-500! focus:border-red-500! bg-slate-300' : '')
        }
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete={autoComplete}
      />
      <ErrorMessage messages={error} />
    </div>
  )
}
//  'w-sm text-neutral-700 text-sm border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 ' +
//                 (editMode === 'email'
//                   ? 'bg-gray-100 border-blue-500 focus:ring-blue-500'
//                   : 'cursor-default focus:ring-0! bg-white border-transparent')