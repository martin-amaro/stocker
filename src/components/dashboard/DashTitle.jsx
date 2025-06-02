import React from 'react'

export const DashTitle = ({title, children}) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">
        {children}
      </p>
    </>
  )
}
