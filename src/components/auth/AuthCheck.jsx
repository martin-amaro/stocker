import { CircleX, CheckCircle } from 'lucide-react';
import React from 'react'

export const AuthCheck = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mt-6">
            <CheckCircle size={24} className="text-green-600" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    )
}
