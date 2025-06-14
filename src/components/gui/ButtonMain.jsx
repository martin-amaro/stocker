import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonMain = ({
    to = null,
    onClick = () => { },
    className = '',
    loading = null,
    disabled = null,
    skin = 'btn-main',
    children
}) => {
    const Component = to ? Link : 'button'
    const props = to
        ? { to }
        : {
              onClick,
              disabled: loading || disabled,
              type: 'button',
          }

    return (
        <Component
            {...props}
            className={`${skin} flex justify-center ${className}`}
        >
            {loading ? <LoaderCircle className='animate-spin' /> : children}
        </Component>
    )
}
