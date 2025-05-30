import React from 'react'
import { Auth } from './auth/Auth'
import { HeaderAuth } from './HeaderAuth'
import { Guest } from './auth/Guest'
import { HeaderGuest } from './HeaderGuest'

export const Header = ({simple = false}) => {
  return (
    <>
        <Auth>
            <HeaderAuth />
        </Auth>
        <Guest>
            <HeaderGuest simple={simple} />
        </Guest>


    </>
  )
}
