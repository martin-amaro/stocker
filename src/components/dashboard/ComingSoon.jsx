import { Loader, Pickaxe } from 'lucide-react'
import React from 'react'

export const ComingSoon = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full p-5 max-w-lg mx-auto text-center'>
        <Pickaxe className='size-12' />
        <h2 className='font-display text-3xl m-2 font-medium '>Esta sección está en construcción</h2>
        <p>Pronto estará habilitada.</p>
    </div>
  )
}
