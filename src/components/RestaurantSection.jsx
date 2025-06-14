import React from 'react';
import { ClipboardList, ChefHat, Timer, TrendingUp, Users, Receipt } from 'lucide-react';

const features = [
  {
    icon: <ChefHat className="w-6 h-6 text-primary" />,
    title: 'Control de Cocina',
    description: 'Gestiona inventarios, recetas y costos de producción.'
  },
  {
    icon: <Receipt className="w-6 h-6 text-primary" />,
    title: 'Facturación Rápida',
    description: 'Sistema POS integrado para gestión de mesas y pedidos.'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: 'Análisis de Ventas',
    description: 'Reportes detallados de platos más vendidos y rentabilidad.'
  }
];

export const RestaurantSection = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-[#f3f6fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display text-title sm:text-4xl lg:text-5xl">
            Soluciones para Restaurantes
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Optimiza la gestión de tu restaurante con nuestras herramientas especializadas
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold font-display text-title">{feature.title}</h3>
                <p className="mt-2 font-app text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
