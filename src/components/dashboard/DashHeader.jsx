import React from 'react'

export const DashHeader = ({title}) => {
  return (
    <div className="w-full py-4 px-6 bg-dash-header text-blue-text font-semibold text-sm">
      {title}
    </div>
  )
}
