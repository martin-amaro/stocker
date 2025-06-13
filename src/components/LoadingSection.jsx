import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const LoadingSection = ({loading, children}) => {
  return (
    <>
    {loading ? (
        <div className='w-full min-h-screen flex items-center justify-center'>
        <LoaderCircle className='w-8 h-8 text-blue-600 animate-spin'/>
        </div>

    ) : (
        children
    )}
        
    </>
  )
}
