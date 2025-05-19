import React from 'react'

export const Badge = ({text}) => {
  return (
    <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 my-2 uppercase tracking-wide">
      {text}
    </span>
  )
}
