import React, { useState } from 'react';
import { Badge } from '../Badge';

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Primer item activo por defecto

    const toggleFAQ = (index) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    const faqs = [
        {
            question: '¿Qué es el gestor de inventario?',
            answer: 'Es una solución integral para almacenar, gestionar y controlar inventarios de manera eficiente en diversos sectores como retail, hotelería, restaurantes, construcción y más. Facilita la administración de productos, stock, entradas y salidas en tiempo real.'
        },
        {
            question: '¿Puedo cancelar mi suscripción en cualquier momento?',
            answer: 'Sí, tienes la libertad de cancelar tu suscripción en cualquier momento sin penalizaciones ni costos adicionales.'
        },
        {
            question: '¿El software es compatible con dispositivos móviles y tablets?',
            answer: 'Sí, nuestra plataforma está diseñada para funcionar perfectamente en dispositivos móviles y tablets, permitiéndote gestionar tu inventario desde cualquier lugar.'
        },
        {
            question: '¿Puedo exportar mis datos a Excel o CSV?',
            answer: 'Por supuesto, puedes exportar toda la información de tu inventario en formatos Excel y CSV para realizar análisis, respaldos o integraciones con otros sistemas.'
        },
        {
            question: '¿Es posible integrar el gestor con otros sistemas o software?',
            answer: 'Sí, ofrecemos opciones de integración mediante APIs y exportación de datos para conectarte con sistemas contables, ERP o plataformas de ventas.'
        },
        {
            question: '¿Cómo se asegura la privacidad y seguridad de mis datos?',
            answer: 'Contamos con protocolos de seguridad avanzados, encriptación de datos y backups automáticos para garantizar la protección y disponibilidad de tu información.'
        },
        {
            question: '¿Puedo gestionar múltiples ubicaciones o sucursales?',
            answer: 'Sí, el sistema permite administrar inventarios de múltiples sucursales o almacenes desde una única plataforma.'
        }
    ];


    return (
        <section className="my-24 mx-auto max-w-limit">

            <div className="w-full flex flex-col items-center justify-center my-12 ">
                <Badge text="Preguntas Frecuentes"/>
                <h2 className='section-title text-center'>Todo lo que necesitas saber</h2>
            </div>
            <div className="flex flex-col w-full mx-auto px-3 lg:flex-row lg:w-[90%] lg:p-8 gap-8 lg:gap-0">
                <div className="w-full overflow-hidden lg:w-[40%]">
                    <img
                        src="images/faq.jpg"
                        alt=""
                        className="rounded-lg w-full h-[180px] object-cover lg:object-none lg:h-auto lg:w-auto"
                    />
                </div>
                <div className="flex flex-col items-center gap-[10px] w-full px-0 md:px-20 lg:w-[60%]">
                    {faqs.map((faq, index) => (
                        <div className="faq-item w-full select-none" key={index}>
                            <button
                                className={`faq-title w-full flex justify-between items-center text-left gap-2 px-5 py-3 text-lg lg:text-lg bg-white text-neutral-700 transition-all cursor-pointer ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className='flex-1'>{faq.question}</span>
                                <svg className="fal w-7 h-7 shrink-0 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#303030">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                            <div className={`faq-content grid transition-[grid-template-rows] duration-300 ease-in-out px-6 border-t border-t-[#878787] ${activeIndex === index ? 'active' : ''}`}>
                                <div className="faq-content__ov overflow-hidden">
                                    <p className='text-neutral-500 my-4 text-base md:text-md leading-snug'>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
