import { Package } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-center font-app">
      <Package className='size-16 mb-3' />
      <h1 className="text-5xl font-bold text-blue-text ">404</h1>
      <p className="text-base mt-4 text-neutral-600 max-w-sm">Te pedimos disculpas, no pudimos hallar lo que buscabas. Mejor intenta con estas otras opciones.</p>
      <Link to="/" className="mt-6 mb-2! btn-main shadow-none! rounded-md! w-[200px] text-sm!">
        Volver al inicio
      </Link>
      <Link to="/" className="mt-2 btn-text w-[200px] text-sm!">
        Soporte
      </Link>
    </div>
  );
};

