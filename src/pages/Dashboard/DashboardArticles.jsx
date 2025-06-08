import React from 'react'
import { ComingSoon } from '../../components/dashboard/ComingSoon'
import { DashHeader } from './../../components/dashboard/DashHeader';
import { DashTitle } from './../../components/dashboard/DashTitle';

export const DashboardArticles = () => {
  return (
    <div className='relative overflow-hidden'>
      <DashHeader title="Artículos" />


      <div className="p-8 max-w-2xl">
        <DashTitle title="Agrega artículos y servicios">
          Aquí puedes configurar las opciones de tu panel de control.
        </DashTitle>
      </div>
    </div>
  )
}
