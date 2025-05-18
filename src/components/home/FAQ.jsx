import React, { useState } from 'react';
import { Img } from '../Img';

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Primer item activo por defecto

    const toggleFAQ = (index) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    const faqs = [
        {
            question: '¿Qué es el gestor de inventario?',
            answer: 'Es una herramienta que permite un almacenamiento, gestión y control eficiente del inventario, ideal para restaurantes, construcción, tiendas y otros negocios.'
        },
        {
            question: '¿Puedo cancelar en cualquier momento?',
            answer: 'Sí, puedes cancelar en cualquier momento sin penalizaciones.'
        },
        {
            question: '¿El software es compatible con dispositivos móviles?',
            answer: 'Sí, el gestor de inventario es compatible con dispositivos móviles y tablets.'
        },
        {
            question: '¿Puedo exportar mis datos a Excel o CSV?',
            answer: 'Sí, puedes exportar tu inventario en formatos Excel y CSV para mayor flexibilidad.'
        }
    ];

    return (
        <section className="faq-section">
            <div className="feature-section__info">
                <h2>Preguntas Frecuentes</h2>
            </div>
            <div className="faq-container">
                <div className="faq-media">
                    <Img src="images/faq.jpg" alt="" />
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div className="faq-item" key={index}>
                            <button
                                className={`faq-title ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <svg className="fal" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e3e3e3">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                            <div className={`faq-content ${activeIndex === index ? 'active' : ''}`}>
                                <div className="faq-content__ov">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
