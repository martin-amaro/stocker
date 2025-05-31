import React from 'react'
import { useSearchParams } from 'react-router-dom';

export const DashboardSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div>
      Buscando: {query ? query : "No hay consulta"}
    </div>
  )
}
