import React from 'react'

export const Img = ({src, className}) => {
  return (
    <img className={className} src={"../src/assets/" + src}/>
  )
}
