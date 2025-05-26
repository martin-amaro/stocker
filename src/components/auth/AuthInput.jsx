import React from 'react'
import { ErrorMessage } from './ErrorMessage';

export const AuthInput = ({ label, name, type, action, disabled, placeholder, error }) => {
    return (
        <div>
            {label && <label className="text-slate-800 text-sm font-medium mb-2 block">{label}</label>}
            <input
                name={name}
                type={type}
                onChange={action}
                disabled={disabled}
                className="text-slate-800 bg-white border border-slate-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                placeholder={placeholder}
            />
            <ErrorMessage message={error} />
        </div>
    )
}
