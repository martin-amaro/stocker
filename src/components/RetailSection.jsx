import React from 'react';
import { ShoppingBag, BarChart2, Truck, QrCode, Package, Boxes } from 'lucide-react';

const features = [
  {
    icon: <Boxes className="w-6 h-6 text-primary" />,
    title: 'Control de Inventario',
    description: 'Gestión de stock en tiempo real multi-sucursal.'
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
    title: 'Análisis de Ventas',
    description: 'Reportes detallados y pronósticos de demanda.'
  },
  {
    icon: <QrCode className="w-6 h-6 text-primary" />,
    title: 'Gestión de Códigos',
    description: 'Sistema de códigos de barras y QR integrado.'
  }
];

export const RetailSection = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-[#f3f6fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display text-title sm:text-4xl lg:text-5xl">
            Soluciones para Retail
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Impulsa tus ventas con nuestro sistema integral de gestión
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