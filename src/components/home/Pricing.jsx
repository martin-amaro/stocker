
import React, { useEffect, useState } from 'react';
import { Badge } from './../Badge';

const pricingData = [
    {
        name: 'Personal',
        description: 'Todo lo que necesitas para empezar',
        price: 'Gratis',
        frequency: '',
        button: 'Comenzar',
        features: [
            'Analítica',
            'Informes de tareas y problemas',
            'Hasta 3 años de historial de datos y evidencias',
        ]
    },
    {
        name: 'Premium',
        description: 'Mejore la seguridad, la calidad y las operaciones para equipos en crecimiento',
        price: '$60.000',
        frequency: 'mensuales',
        button: 'Comenzar',
        features: [
            'Analítica avanzada',
            'Gestión de permisos y accesos',
            'Integraciones listas para usar y personalizadas',
            'Historial ilimitado de datos y evidencias',
        ]
    },
    {
        name: 'Enterprise',
        description: 'Solución integral para grandes empresas con necesidades avanzadas de inventario',
        price: 'Desde $150K',
        frequency: 'mensuales',
        button: 'Contactar ventas',
        features: [
            'Integración con ERP',
            'Usuarios y roles personalizados',
            'Soporte 24/7 prioritario',
            'Análisis predictivo de stock',
            'Reportes personalizados'
        ]
    }
];

export const Pricing = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        setPlans(pricingData);
    }, []);

    return (
        <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <Badge text="Precios"/>
                    <h2 className="section-title">Escoge tu mejor plan</h2>
                </div>

                <div className="mt-8 p-10 sm:mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-7xl lg:mx-auto">
                    {plans.map((plan, index) => (
                        // Card
                        <div key={index} className="bg-white border border-neutral-200 rounded-lg shadow-sm divide-y divide-neutral-200">
                            <div className="p-6">
                                <h2 className="text-lg leading-6 font-medium text-neutral-900">{plan.name}</h2>
                                <p className="mt-4 text-sm h-10 text-neutral-500">{plan.description}</p>
                                <p className="mt-4 flex flex-col space-y-2">
                                    {plan.frequency ? (
                                        <span className="flex flex-row space-x-2 items-center">
                                            <span className="text-4xl font-extrabold text-neutral-900">{plan.price}</span>
                                            <span className="text-xs font-medium text-neutral-500">{plan.frequency}</span>
                                        </span>
                                    ) : (
                                        <span className="text-4xl font-extrabold text-neutral-900">{plan.price}</span>
                                    )}
                                </p>
                                <a href="#"
                                    className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    {plan.button}
                                </a>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-xs font-medium text-neutral-900 tracking-wide uppercase">
                                    {/* {index === 0 ? 'Incluye' : "What's included"} */}
                                    Incluye
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex space-x-3">
                                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24"
                                                className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-sm text-neutral-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
