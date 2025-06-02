import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashHeader } from '../../components/dashboard/DashHeader';
import { DashTitle } from '../../components/dashboard/DashTitle';

export const DashboardSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div>
      <DashHeader title="Búsqueda" />
      <div className="p-8 max-w-2xl">
        <DashTitle title={query ? `Resultados de \"${query || ''}\"` : "Empieza a buscar"} className="mb-4">
          Se muestran 0 resultados para tu búsqueda.
        </DashTitle>
      </div>


    </div>
    
  )
}
