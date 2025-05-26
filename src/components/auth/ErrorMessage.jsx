import { CircleX } from 'lucide-react';
import React from 'react'

export const ErrorMessage = ({message}) => {
    if (!message) return null;
    return (
        <div className="flex items-center text-red-600 text-sm mt-1 gap-2">
            <CircleX size={16} />
            <span>{message}</span>
        </div>
    );
}
