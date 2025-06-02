import React from 'react'
import { DashHeader } from '../../components/dashboard/DashHeader'
import { DashTitle } from './../../components/dashboard/DashTitle';

export const DashboardBusiness = () => {
  return (
    <div>
      <DashHeader title="Mi negocio" />
      <div className="p-8 max-w-2xl">
        <DashTitle title="Acerca de">
          Aquí puedes configurar las opciones de tu panel de control.
        </DashTitle>
      </div>

    </div>
  )
}
