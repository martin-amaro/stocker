import React from 'react'

export const GuiCard = ({ className, children }) => {
  return (
    <div className={'bg-white rounded-xl shadow p-5 ' + className}>
        { children }
    </div>
  )
}
